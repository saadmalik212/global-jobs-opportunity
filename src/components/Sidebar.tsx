"use client";

import { PAKISTAN_DEMAND_CITIES, TARGET_COUNTRIES } from "@/lib/constants";
import { JobFilters } from "@/lib/types";

interface Props {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export default function Sidebar({ filters, onChange }: Props) {
  function toggleCity(city: string) {
    const next = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city];
    onChange({ ...filters, cities: next });
  }

  function toggleCountry(country: string) {
    const next = filters.countries.includes(country)
      ? filters.countries.filter((c) => c !== country)
      : [...filters.countries, country];
    onChange({ ...filters, countries: next });
  }

  function clearAll() {
    onChange({ cities: [], countries: [], remoteOnly: false, internshipOnly: false });
  }

  const hasActiveFilters =
    filters.cities.length > 0 ||
    filters.countries.length > 0 ||
    filters.remoteOnly ||
    filters.internshipOnly;

  return (
    <aside className="sidebar-scroll h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs font-medium text-muted underline decoration-dotted hover:text-primary"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Pakistan Demand Cities — dropdown-style multi select */}
      <fieldset className="mb-6">
        <legend className="mb-2 text-sm font-semibold text-ink">
          Pakistan Demand Cities
        </legend>
        <div className="relative">
          <select
            className="w-full appearance-none rounded-lg border border-border bg-canvas px-3 py-2 text-sm text-ink focus:border-primary"
            onChange={(e) => {
              if (e.target.value) toggleCity(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>
              {filters.cities.length
                ? `${filters.cities.length} selected`
                : "Select a city"}
            </option>
            {PAKISTAN_DEMAND_CITIES.map((city) => (
              <option key={city} value={city} disabled={filters.cities.includes(city)}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {filters.cities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {filters.cities.map((city) => (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary-dark"
              >
                {city}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
      </fieldset>

      {/* Countries */}
      <fieldset className="mb-6">
        <legend className="mb-2 text-sm font-semibold text-ink">Countries</legend>
        <div className="space-y-2">
          {TARGET_COUNTRIES.map((country) => (
            <label
              key={country}
              className="flex cursor-pointer items-center gap-2 text-sm text-ink/85"
            >
              <input
                type="checkbox"
                checked={filters.countries.includes(country)}
                onChange={() => toggleCountry(country)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              {country}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Remote / Internship */}
      <fieldset className="space-y-2 border-t border-border pt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={filters.remoteOnly}
            onChange={() => onChange({ ...filters, remoteOnly: !filters.remoteOnly })}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Remote
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={filters.internshipOnly}
            onChange={() =>
              onChange({ ...filters, internshipOnly: !filters.internshipOnly })
            }
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Internship
        </label>
      </fieldset>
    </aside>
  );
}
