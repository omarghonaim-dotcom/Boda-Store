import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, type PanInfo, useMotionValue, useTransform } from 'motion/react';
import { type JSX } from 'react';

export interface CarouselItem {
  imgSrc: string;
  alt?: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  /**
   * Max width the carousel will grow to, in px. The carousel is fluid below
   * this value — it always fills 100% of its parent, up to this cap.
   * Omit (or pass Infinity) for a fully fluid carousel with no cap.
   */
  baseWidth?: number;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    imgSrc: '/public/images/p1.jpg'
  },
  {
    imgSrc: '/public/images/p2.jpg'
  },
  {
    imgSrc: '/public/images/p3.jpg'
  },
  {
    imgSrc: '/public/images/p5.jpeg'
  },
  {
    imgSrc: '/public/images/p6.png'
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: any;
  transition: any;
}

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={index}
      className={`relative shrink-0 flex flex-col ${
        round
          ? 'items-center justify-center text-center bg-[#120F17] border-0'
          : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}
    >
      <img
        src={item.imgSrc}
        alt={item.alt ?? ''}
        draggable={false}
        className="h-full w-full object-cover pointer-events-none select-none"
      />
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 600,
  className = '',
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: CarouselProps): JSX.Element {
  const [containerPadding, setContainerPadding] = useState(16);

  useEffect(() => {
    const updatePadding = () => {
      setContainerPadding(window.innerWidth < 768 ? 8 : 16);
    };
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  // Measure the actual rendered width of the carousel's outer wrapper so all
  // the pixel math (item width, drag offsets, perspective origin) tracks the
  // real, responsive size instead of the fixed baseWidth prop.
  const outerRef = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>(baseWidth);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return undefined;

    const updateWidth = (width: number) => {
      setMeasuredWidth(prev => (Math.abs(prev - width) > 0.5 ? width : prev));
    };

    updateWidth(el.getBoundingClientRect().width);

    if (typeof ResizeObserver === 'undefined') {
      const handleResize = () => updateWidth(el.getBoundingClientRect().width);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        updateWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trackWidth = measuredWidth;
  const itemWidth = Math.max(trackWidth - containerPadding * 2, 0);
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, loop]);

  // Re-sync the x motion value whenever the measured width (and therefore
  // trackItemOffset) changes, so a resize doesn't leave the track misaligned.
  useEffect(() => {
    x.set(-position * trackItemOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackItemOffset]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={outerRef}
      className={`relative overflow-hidden px-2 md:px-4 w-full m-auto ${className}`}
      style={{
        maxWidth: Number.isFinite(baseWidth) ? `${baseWidth}px` : undefined,
        aspectRatio: round ? '1 / 1' : '4 / 3',
        ...(round && { height: trackWidth ? `${trackWidth}px` : undefined }),
      }}
    >
      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex"
          drag={isAnimating ? false : 'x'}
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
            x
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={index}
              item={item}
              index={index}
              itemWidth={itemWidth}
              round={round}
              trackItemOffset={trackItemOffset}
              x={x}
              transition={effectiveTransition}
            />
          ))}
        </motion.div>
        <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
          <div className="mt-4 flex w-[150px] justify-between px-8">
            {items.map((_, index) => (
              <motion.button
                type="button"
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index}
                className={`h-2 w-2 rounded-full cursor-pointer border-0 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  activeIndex === index
                    ? round
                      ? 'bg-white'
                      : 'bg-[#333333]'
                    : round
                      ? 'bg-[#555]'
                      : 'bg-[rgba(51,51,51,0.4)]'
                }`}
                animate={{
                  scale: activeIndex === index ? 1.2 : 1
                }}
                onClick={() => setPosition(loop ? index + 1 : index)}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}