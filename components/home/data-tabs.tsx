"use client";

import { useState } from "react";
import { CheckSquare, Code, Database, Doc, Logo, Message } from "../icons";
import { MonoLink, Toolbar } from "../ui";

const categories = [
  {
    id: "messages",
    label: "Messages",
    Icon: Message,
    description:
      "Chats, threads, and channels where people coordinate work, including the decisions they reach and the reasoning behind them.",
    sources: ["Slack", "Microsoft Teams", "Gmail", "Outlook"],
  },
  {
    id: "codebases",
    label: "Codebases",
    Icon: Code,
    description:
      "Real repositories and the history behind them: commits, reviews, and issues that explain why code looks the way it does.",
    sources: ["GitHub", "GitLab", "Bitbucket", "Jira"],
  },
  {
    id: "documents",
    label: "Documents",
    Icon: Doc,
    description:
      "Docs, contracts, reports, slides, and PDFs: the written record of what an organization knows and how it works.",
    sources: ["Google Drive", "SharePoint", "Notion", "DocuSign"],
  },
  {
    id: "raw",
    label: "Raw data",
    Icon: Database,
    description:
      "Records, tables, logs, and exports from the systems that run the business: pipelines, invoices, ledgers, and orders.",
    sources: ["Salesforce", "HubSpot", "QuickBooks", "Xero"],
  },
  {
    id: "tasks",
    label: "Tasks",
    Icon: CheckSquare,
    description:
      "Tickets and project work captured end to end: the brief, the steps taken, the back-and-forth, and the finished result.",
    sources: ["Zendesk", "Asana", "ServiceNow"],
  },
];

export function DataTabs() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <div>
      <div role="tablist" className="flex overflow-x-auto border-y border-line bg-th/[.04]">
        {categories.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`flex h-10 shrink-0 items-center gap-2 border-r border-line px-4 mono-label transition-colors ${
                on ? "bg-th text-white" : "text-ink/70 hover:bg-th/[.06] hover:text-ink"
              }`}
            >
              <c.Icon size={13} />
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="bg-th/[.035] px-6 py-10 sm:px-[55px]">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mono-label text-th-700">0{active + 1} / 05</p>
            <h3 className="mt-2 font-serif text-[22px] text-ink">{cat.label}</h3>
            <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-ink/75">{cat.description}</p>
            <p className="mt-6 mono-label text-ink/55">Listed sources</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {cat.sources.map((s) => (
                <span
                  key={s}
                  className="inline-flex h-7 items-center rounded-[3px] border border-line bg-white px-2.5 text-[12.5px] text-ink/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <MonoLink href="/business">Learn about listings</MonoLink>
        </div>
      </div>

      <Toolbar className="border-b-0">
        <span className="flex items-center gap-3">
          <span className="font-serif text-[15px] text-ink">Up to 6 figures</span>
          <span className="mono-label text-ink/55">per workspace</span>
        </span>
        <Logo className="[&_span]:text-[13px] [&_svg]:size-3.5" />
      </Toolbar>
    </div>
  );
}
