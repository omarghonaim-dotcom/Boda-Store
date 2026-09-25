import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

// =====================
// Types
// =====================

export interface Book {
  id: number;
  imgsrc: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  count: number;
}

interface CartItem extends Book {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: Book;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: number;
    }
  | {
      type: "INCREASE_QUANTITY";
      payload: number;
    }
  | {
      type: "DECREASE_QUANTITY";
      payload: number;
    };

// =====================
// Context
// =====================

interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const cartContext = createContext<CartContextType | undefined>(
  undefined,
);

// =====================
// Initial State
// =====================

const initialState: CartState = {
  cart: [],
};

// =====================
// Reducer
// =====================

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    // =====================
    // ADD TO CART
    // =====================

    case "ADD_TO_CART": {
      const existingCartItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    // =====================
    // REMOVE FROM CART
    // =====================

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    // =====================
    // INCREASE QUANTITY
    // =====================

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    // =====================
    // DECREASE QUANTITY
    // =====================

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
};

// =====================
// Provider
// =====================

interface CartProviderProps {
  children: ReactNode;
}

export default function CartContext({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}
