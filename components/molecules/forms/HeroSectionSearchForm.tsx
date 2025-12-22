"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import VoiceSearch from "../VoiceSearch";

import { ROUTES } from "@/lib/constants/routes";
import VoiceSearchEmptyState from "../VoiceSearchEmptyState";
import { SearchCategory, VoiceState } from "@/types";

const HeroSectionSearchForm = () => {
  const router = useRouter();

  const searchTypeArr = ["jobs", "experts", "materials"];

  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [searchType, setSearchType] = useState<SearchCategory | null>("jobs");
  const [transcript, setTranscript] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams({ q: searchQuery.trim() });
      const route =
        searchType === "jobs"
          ? ROUTES.FIND_JOB
          : searchType === "experts"
          ? ROUTES.SEARCH_SERVICE
          : ROUTES.SEARCH_MATERIAL;
      router.push(`${route}?${searchParams.toString()}`);
    }
  };

  const handleVoiceSearchComplete = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col items-center gap-2 max-w-96 w-full">
      <ul className="flex items-center gap-2">
        <span className="font-medium pr-2 text-sm">Search type:</span>
        {searchTypeArr.map((type) => (
          <li
            key={type}
            className={`cursor-pointer text-gray-500 ${
              type === searchType ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setSearchType(type as any)}
          >
            {type}
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-1 px-3 h-12 border border-gray-400 rounded-lg focus-within:border-primary-green"
      >
        <input
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          placeholder={
            searchType
              ? `Search for ${searchType} (e.g., carpenter)`
              : "Search for jobs, experts, or materials..."
          }
          className="flex-1 bg-inherit outline-none px-2 text-sm sm:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <VoiceSearch
          onSearchComplete={handleVoiceSearchComplete}
          selectedCategory={searchType}
          setSelectedCategory={setSearchType}
          setError={setError}
          voiceState={voiceState}
          setVoiceState={setVoiceState}
          isActive={isActive}
          setIsActive={setIsActive}
          setTranscript={setTranscript}
        />
        <button type="submit">
          <Image
            src="/icons/Group 26929.svg"
            width={20}
            height={20}
            alt="submit icon"
            className="object-contain w-8 h-8"
          />
        </button>
      </form>
      <VoiceSearchEmptyState
        error={error}
        transcript={transcript}
        isActive={isActive}
        selectedCategory={searchType}
        voiceState={voiceState}
      />
    </div>
  );
};

export default HeroSectionSearchForm;
