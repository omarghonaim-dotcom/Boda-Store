import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Skeleton */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-full max-w-md">
              <div className="bg-gray-200 rounded-3xl p-6 h-[400px]"></div>
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="flex flex-col justify-center order-2 lg:order-1 space-y-6">
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="flex gap-3">
              <div className="h-8 bg-gray-200 rounded-lg w-28"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 rounded-full w-24"></div>
                <div className="h-10 bg-gray-200 rounded-full w-24"></div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-3xl h-32"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-48 mx-auto"></div>
            <div className="flex gap-4">
              <div className="flex-1 h-14 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-14 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
