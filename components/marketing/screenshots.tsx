"use client";

import Image from "next/image";

export function Screenshots() {
  return (
    <div className="relative w-full px-4 py-8">
      {/* Main Dashboard */}
      <div className="rounded-lg shadow-2xl overflow-hidden mb-8 md:mb-0">
        <Image
          src="/images/screenshots/analytics-dark.png"
          alt="Analytics Dashboard"
          width={1200}
          height={800}
          className="rounded-lg w-full"
          priority
        />
      </div>
      
      {/* Floating Feature Screenshots */}
      <div className="md:absolute static -right-10 -bottom-10 transition-transform hover:scale-105">
        <div className="rounded-lg shadow-xl overflow-hidden">
          <Image
            src="/images/screenshots/dashboard-dark.png"
            alt="Analytics Features"
            width={400}
            height={300}
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
} 