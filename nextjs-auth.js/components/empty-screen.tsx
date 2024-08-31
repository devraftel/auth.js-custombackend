"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from "@/lib/utils";
import { SiFastapi } from "react-icons/si";
import { buttonVariants } from "./ui/button";

import React from 'react'
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'

export function EmptyScreen({ email }: { email: string | null }) {
  return (
    <>
    
    <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes textShadow {
          0% { text-shadow: 0 0 0 #fff, 0 0 0 #fff, 0 0 0 #fff, 0 0 0 #fff; }
          100% { text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animate-text-shadow {
          animation: textShadow 2s ease-in-out infinite alternate;
        }
        
        .scene {
          perspective: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        
        .cube {
          width: 100px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(-50px);
          transition: transform 1s;
          animation: cube-rotate 20s infinite linear;
        }
        
        @keyframes cube-rotate {
          0% { transform: translateZ(-50px) rotateX(0deg) rotateY(0deg); }
          100% { transform: translateZ(-50px) rotateX(360deg) rotateY(360deg); }
        }
        
        .cube__face {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid rgba(79, 70, 229, 0.1);
          background: rgba(79, 70, 229, 0.05);
          opacity: 0.5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: rgba(79, 70, 229, 0.3);
        }
        
        .cube__face--front  { transform: rotateY(  0deg) translateZ(50px); }
        .cube__face--right  { transform: rotateY( 90deg) translateZ(50px); }
        .cube__face--back   { transform: rotateY(180deg) translateZ(50px); }
        .cube__face--left   { transform: rotateY(-90deg) translateZ(50px); }
        .cube__face--top    { transform: rotateX( 90deg) translateZ(50px); }
        .cube__face--bottom { transform: rotateX(-90deg) translateZ(50px); }
        
        .cube-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 100px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>



<div className="relative h-[888px]  min-h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 overflow-hidden scene">
          <div className="cube-grid">
            {[...Array(25)].map((_, index) => (
              <div key={index} className="cube">
                <div className="cube__face cube__face--front"></div>
                <div className="cube__face cube__face--back"></div>
                <div className="cube__face cube__face--right"></div>
                <div className="cube__face cube__face--left"></div>
                <div className="cube__face cube__face--top"></div>
                <div className="cube__face cube__face--bottom"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="teuth.js-Custom Projxt-5xl md:text-7xl font-bold mb-6 animate-text-shadow">
          Auth.JS Custom Template
          </h1>
          <p className="ointer-events-none max-w-3xl text-center text-base font-light text-zinc-800">
          {email ? email : ""}
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <FaReact className="text-4xl animate-float" />
            <FaNodeJs className="text-4xl animate-float animation-delay-200" />
            <FaDatabase className="text-4xl animate-float animation-delay-400" />
            <SiFastapi className="text-4xl animate-float animation-delay-600" />
          </div>
          <a
          href="https://github.com/devraftel/auth.js-custombackend"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: `flex items-center font-mono text-lg font-semibold text-purple-800`,
            }),
          )}
        >
          <GitHubLogoIcon width={"24"} height={"24"} className="mx-2" />
          <span className="mr-1">Get boilerplate code</span>
        </a>
        </div>
      </div>

    </>
  
  );
}
