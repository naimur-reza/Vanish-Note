"use client";

import type React from "react";

import Button from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePoll() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expiration, setExpiration] = useState("3600"); // 1 hour in seconds
  const [hideResults, setHideResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!question.trim()) return;
    if (options.some((option) => !option.trim())) return;

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      setTimeout(() => {
        // Generate a random poll ID
        const pollId = Math.random().toString(36).substring(2, 15);
        router.push(`/poll/${pollId}`);
      }, 1000);
    } catch (error) {
      console.error("Failed to create poll:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center text-sm transition-colors hover:text-gray-800 dark:hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Back to home
        </Link>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Create a New Poll</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your poll will be accessible via a unique link and will expire
            automatically.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <label htmlFor="question" className="block text-sm font-medium">
                Question
              </label>
              <textarea
                id="question"
                placeholder="What do you want to ask?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="focus:border-primary focus:ring-primary min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">Options</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="focus:border-primary focus:ring-primary h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeOption(index)}
                    disabled={options.length <= 2}
                    className="inline-flex items-center justify-center rounded-md focus:outline-none disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove option</span>
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addOption}
                disabled={options.length >= 10}
                className="B inline-flex w-full items-center justify-center px-4 py-2 text-sm font-medium shadow-sm focus:outline-none disabled:opacity-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Poll Duration</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <input
                    type="radio"
                    id="1hour"
                    name="expiration"
                    value="3600"
                    checked={expiration === "3600"}
                    onChange={(e) => setExpiration(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="1hour" className="flex-1 text-sm">
                    1 hour
                  </label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <input
                    type="radio"
                    id="12hours"
                    name="expiration"
                    value="43200"
                    checked={expiration === "43200"}
                    onChange={(e) => setExpiration(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="12hours" className="flex-1 text-sm">
                    12 hours
                  </label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <input
                    type="radio"
                    id="24hours"
                    name="expiration"
                    value="86400"
                    checked={expiration === "86400"}
                    onChange={(e) => setExpiration(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="24hours" className="flex-1 text-sm">
                    24 hours
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors dark:bg-gray-800">
                <input
                  type="checkbox"
                  id="hide-results"
                  checked={hideResults}
                  onChange={(e) => setHideResults(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={`${
                    hideResults
                      ? "bg-primary translate-x-6"
                      : "translate-x-1 bg-white"
                  } inline-block h-4 w-4 transform rounded-full transition-transform`}
                />
                <label
                  htmlFor="hide-results"
                  className="absolute inset-0 cursor-pointer rounded-full"
                />
              </div>
              <label htmlFor="hide-results" className="text-sm font-medium">
                Hide results until poll expires
              </label>
            </div>
          </div>
          <div className="border-t p-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Poll"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
