"use client";

import { SignIn } from "@clerk/nextjs";
import { X } from "lucide-react";
import React from "react";

function AuthModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-md overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-neutral-800 transition-colors p-1 hover:bg-neutral-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 border-b border-neutral-100">
          <h2 className="text-2xl font-semibold text-neutral-900">Welcome to jottr</h2>
          <p className="text-sm text-neutral-500 mt-1">Sign in to continue to your workspace</p>
        </div>

        {/* Clerk SignIn with custom minimal appearance */}
        <div className="px-8 py-6">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none p-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 rounded-lg py-2.5 transition-all font-normal text-sm",
                socialButtonsBlockButtonText: "font-normal text-sm",
                dividerLine: "bg-neutral-200",
                dividerText: "text-neutral-400 text-xs",
                formFieldLabel: "text-sm font-medium text-neutral-700 mb-1.5",
                formFieldInput:
                  "rounded-lg border border-neutral-300 focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800 py-2.5 px-3 text-sm transition-all",
                formButtonPrimary:
                  "bg-neutral-900 text-white rounded-lg py-2.5 hover:bg-neutral-800 transition-all font-medium text-sm shadow-sm",
                footerActionLink: "text-neutral-900 hover:text-neutral-700 font-medium text-sm",
                identityPreviewText: "text-sm text-neutral-600",
                formResendCodeLink: "text-neutral-900 hover:text-neutral-700 text-sm",
                otpCodeFieldInput: "border-neutral-300 focus:border-neutral-800",
              },
              variables: {
                colorPrimary: "#171717",
                colorText: "#2f3437",
                colorTextSecondary: "#737373",
                fontSize: "14px",
                borderRadius: "0.5rem",
              },
            }}
            redirectUrl="/documents"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;