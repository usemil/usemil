"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2,
  FileCode2,
  Eye,
  Code
} from "lucide-react";
import ToolInfo from "@/components/tools/ToolInfo";

type OutputMode = "preview" | "html";

export default function MarkdownClient() {
  const [inputText, setInputText] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [outputMode, setOutputMode] = useState<OutputMode>("preview");
  const [copied, setCopied] = useState(false);

  // --- ADVANCED MARKDOWN PARSER (10/10 Architecture) ---
  const parseMarkdown = (text: string) => {
    if (!text) return "";
    
    // Normalize newlines and strip script tags for basic XSS protection
    let html = text.replace(/\r\n/g, '\n') + '\n';
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    const placeholders: Record<string, string> = {};
    let blockCount = 0;
    let inlineCount = 0;

    // Safe Stash Helpers 
    const saveBlock = (content: string) => {
        const id = `§B${blockCount++}§`;
        placeholders[id] = content;
        return `\n\n${id}\n\n`; 
    };
    
    const saveInline = (content: string) => {
        const id = `§I${inlineCount++}§`;
        placeholders[id] = content;
        return id;
    };

    // --- HELPER: TYPOGRAPHY ---
    const applyTypography = (str: string) => {
        let res = str;
        res = res.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        res = res.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
        res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        res = res.replace(/__(.*?)__/g, '<strong>$1</strong>');
        res = res.replace(/\*(.*?)\*/g, '<em>$1</em>');
        res = res.replace(/_(.*?)_/g, '<em>$1</em>');
        res = res.replace(/~~(.*?)~~/g, '<del class="text-slate-500">$1</del>');
        return res;
    };

    // --- HELPER: INLINE FORMATTING ---
    const parseInline = (str: string) => {
        let res = str;
        
        // 1. Images (Protect immediately)
        res = res.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
            return saveInline(`<img src="${url}" alt="${alt}" class="max-w-full h-auto rounded-lg shadow-sm my-4 inline-block" />`);
        });
        
        // 2. Standard Links (Apply typography to text, then protect)
        res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            return saveInline(`<a href="${url}" class="text-blue-600 font-bold hover:underline" target="_blank" rel="noopener noreferrer">${applyTypography(text)}</a>`);
        });

        // 3. Auto URLs (Explicit <http...>)
        res = res.replace(/<(https?:\/\/[^>]+)>/g, (match, url) => {
            return saveInline(`<a href="${url}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`);
        });

        // 4. Auto URLs (Plain text, safe because existing links are hidden in placeholders!)
        res = res.replace(/(^|\s)(https?:\/\/[^\s<)]+)/g, (match, space, url) => {
            return space + saveInline(`<a href="${url}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`);
        });
        
        // 5. Typography on everything else
        return applyTypography(res);
    };

    // 1. EXTRACT CODE BLOCKS & INLINE CODE
    html = html.replace(/^```([\w-]*)\n([\s\S]*?)\n```/gm, (match, lang, code) => {
        const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const langClass = lang ? `language-${lang}` : "";
        return saveBlock(`<pre class="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm border border-slate-700 shadow-inner"><code class="${langClass}">${escaped}</code></pre>`);
    });

    html = html.replace(/`([^`\n]+)`/g, (match, code) => {
        const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return saveInline(`<code class="bg-slate-200 text-rose-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-slate-300">${escaped}</code>`);
    });

    // 2. ESCAPED CHARACTERS
    html = html.replace(/\\([\\`*_{}[\]()#+\-.!>])/g, (match, char) => {
        return `&#${char.charCodeAt(0)};`;
    });

    // 3. EXTRACT TABLES
    html = html.replace(/^(?:\|.*\|\n)+\|?(?:---[-|: ]*)\|?\n(?:\|.*\|\n)+/gm, (match) => {
        const lines = match.trim().split('\n');
        const sepIndex = lines.findIndex(l => l.match(/^\|?[\s\-\|:]+\|?$/));
        if (sepIndex === -1) return match;

        let tableHtml = '<div class="overflow-x-auto my-6"><table class="min-w-full divide-y divide-slate-300 border border-slate-300 rounded-lg">';
        
        if (sepIndex > 0) {
            tableHtml += '<thead class="bg-slate-50"><tr>';
            const headers = lines[0].split('|').map(c=>parseInline(c.trim())).filter((_, i, arr) => !(i === 0 && _ === '') && !(i === arr.length - 1 && _ === ''));
            headers.forEach(h => {
                tableHtml += `<th class="px-4 py-2 text-left text-sm font-bold text-slate-900 border-b border-slate-300">${h}</th>`;
            });
            tableHtml += '</tr></thead>';
        }

        tableHtml += '<tbody class="divide-y divide-slate-200 bg-white">';
        for (let i = sepIndex + 1; i < lines.length; i++) {
            tableHtml += '<tr>';
            const cells = lines[i].split('|').map(c=>parseInline(c.trim())).filter((_, idx, arr) => !(idx === 0 && _ === '') && !(idx === arr.length - 1 && _ === ''));
            cells.forEach(c => {
                tableHtml += `<td class="px-4 py-2 text-sm text-slate-700">${c}</td>`;
            });
            tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div>';
        return saveBlock(tableHtml);
    });

    // 4. BLOCKQUOTES
    html = html.replace(/^(?:>.*\n?)+/gm, (match) => {
        const content = match.replace(/^>[ \t]?/gm, '');
        const paragraphs = content.split(/\n{2,}/).filter(p => p.trim()).map(p => `<p class="mb-2 text-slate-700">${parseInline(p.trim())}</p>`).join('');
        return saveBlock(`<blockquote class="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 italic text-slate-700 my-4 rounded-r-lg">${paragraphs}</blockquote>`);
    });

    // 5. STACK-BASED LIST PARSER
    const listRegex = /(?:^(?:[ \t]*)(?:[-*+]|\d+\.) .*(?:\n|$))+/gm;
    html = html.replace(listRegex, (match) => {
        const lines = match.split('\n').filter(l => l.trim() !== '');
        let listHtml = '';
        let stack: {indent: number, type: string}[] = []; 

        lines.forEach(line => {
            const indentMatch = line.match(/^[ \t]*/);
            const indent = indentMatch ? indentMatch[0].length : 0;
            const isOrdered = line.trim().match(/^\d+\./);
            const type = isOrdered ? 'ol' : 'ul';
            const contentMatch = line.match(/^[ \t]*(?:[-*+]|\d+\.) (.*)/);
            if (!contentMatch) return; 
            const content = contentMatch[1];

            const taskMatch = content.match(/^\[([xX ]{1})\] (.*)/);
            let itemContent = content;
            let liClass = "class='mb-1 text-slate-700'"; // Fixed inherited white text!
            
            if (taskMatch) {
                const checked = taskMatch[1].toLowerCase() === 'x' ? 'checked' : '';
                const accentClass = checked ? 'accent-blue-600' : '';
                itemContent = `<input type="checkbox" disabled ${checked} class="mr-2 inline-block ${accentClass}"> ${parseInline(taskMatch[2])}`;
                liClass = "class='list-none mb-1 text-slate-700'";
            } else {
                itemContent = parseInline(content);
            }

            if (stack.length === 0) {
                stack.push({ indent, type });
                const listClass = type === 'ol' ? 'list-decimal ml-6 mb-4 mt-2 text-slate-700' : 'list-disc ml-6 mb-4 mt-2 text-slate-700';
                listHtml += `<${type} class="${listClass}">\n<li ${liClass}>${itemContent}`;
            } else {
                let top = stack[stack.length - 1];
                if (indent > top.indent) {
                    stack.push({ indent, type });
                    const listClass = type === 'ol' ? 'list-[lower-alpha] ml-6 mt-1 mb-1 text-slate-700' : 'list-[circle] ml-6 mt-1 mb-1 text-slate-700';
                    listHtml += `\n<${type} class="${listClass}">\n<li ${liClass}>${itemContent}`;
                } else if (indent < top.indent) {
                    while (stack.length > 0 && stack[stack.length - 1].indent > indent) {
                        const popped = stack.pop()!;
                        listHtml += `</li>\n</${popped.type}>\n`;
                    }
                    if (stack.length > 0 && stack[stack.length - 1].indent === indent) {
                        listHtml += `</li>\n<li ${liClass}>${itemContent}`;
                    } else {
                        stack.push({ indent, type });
                        const listClass = type === 'ol' ? 'list-decimal ml-6 mb-4 mt-2 text-slate-700' : 'list-disc ml-6 mb-4 mt-2 text-slate-700';
                        listHtml += `<${type} class="${listClass}">\n<li ${liClass}>${itemContent}`;
                    }
                } else {
                    if (top.type !== type) {
                        listHtml += `</li>\n</${top.type}>\n`;
                        stack.pop();
                        stack.push({ indent, type });
                        const listClass = type === 'ol' ? 'list-decimal ml-6 mb-4 mt-2 text-slate-700' : 'list-disc ml-6 mb-4 mt-2 text-slate-700';
                        listHtml += `<${type} class="${listClass}">\n<li ${liClass}>${itemContent}`;
                    } else {
                        listHtml += `</li>\n<li ${liClass}>${itemContent}`;
                    }
                }
            }
        });

        while (stack.length > 0) {
            const popped = stack.pop()!;
            listHtml += `</li>\n</${popped.type}>\n`;
        }

        return saveBlock(listHtml);
    });

    // 6. HORIZONTAL RULES & HEADINGS
    html = html.replace(/^(\s*[-*_]){3,}\s*$/gm, () => saveBlock('<hr class="my-6 border-slate-300" />'));
    html = html.replace(/^### (.*$)/gm, (match, p1) => saveBlock(`<h3 class="text-xl font-bold mt-6 mb-3 text-slate-800">${parseInline(p1)}</h3>`));
    html = html.replace(/^## (.*$)/gm, (match, p1) => saveBlock(`<h2 class="text-2xl font-bold mt-8 mb-4 border-b border-slate-300 pb-2 text-slate-900">${parseInline(p1)}</h2>`));
    html = html.replace(/^# (.*$)/gm, (match, p1) => saveBlock(`<h1 class="text-3xl font-extrabold mt-8 mb-6 text-slate-900">${parseInline(p1)}</h1>`));

    // 7. PARAGRAPHS & INLINE CATCH-ALL
    let blocks = html.split(/\n{2,}/);
    html = blocks.map(block => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        
        if (trimmed.match(/^§B\d+§$/)) return trimmed;
        if (trimmed.match(/^<\/?(?:div|p|section|article|nav|header|footer|iframe|script|style)/i)) return trimmed;
        
        return `<p class="mb-4 text-slate-700 leading-relaxed">${parseInline(trimmed.replace(/\n/g, '<br/>'))}</p>`;
    }).join('\n\n');

    // 8. RESTORE PLACEHOLDERS
    let containsPlaceholder = true;
    let loopLimit = 0;
    while(containsPlaceholder && loopLimit < 5) {
        containsPlaceholder = false;
        for (const [id, content] of Object.entries(placeholders)) {
            if (html.includes(id)) {
                html = html.replace(id, content);
                containsPlaceholder = true;
            }
        }
        loopLimit++;
    }

    return html.trim();
  };

  useEffect(() => {
    setOutputHtml(parseMarkdown(inputText));
  }, [inputText]);

  const clearAll = () => {
    setInputText("");
    setOutputHtml("");
  };

  const copyToClipboard = () => {
    if (!outputHtml) return;
    navigator.clipboard.writeText(outputHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aboutDescription = (
    <>
      <p className="mb-4">
        The Markdown Previewer is a blazing-fast, zero-dependency utility that converts raw Markdown syntax into beautifully styled HTML in real-time. Whether you are drafting a <code>README.md</code> for a GitHub repository or writing a blog post, this tool lets you visualize the exact output instantly.
      </p>
      <p>
        Because it relies on a custom, native browser Regex engine rather than external plugins, your text is parsed locally in milliseconds. You can toggle between viewing the rendered visual preview or exporting the raw HTML structure for your web projects.
      </p>
    </>
  );

  const howToSteps = [
    {
      title: "Write or Paste Markdown",
      description: "Enter your standard Markdown syntax (like # for headers or ** for bold text) into the left editor.",
    },
    {
      title: "View Live Preview",
      description: "The right panel instantly renders your Markdown using elegant, modern styling. No refresh required.",
    },
    {
      title: "Export HTML",
      description: "Toggle the view mode to 'Raw HTML' to see the exact code structure, then click copy to paste it directly into your CMS or codebase.",
    },
  ];

  const faqs = [
    {
      question: "Which Markdown elements are supported?",
      answer: "The parser supports standard core elements: H1-H3 Headers, Bold, Italics, Strikethrough, Blockquotes, Ordered/Unordered Lists, Nested Lists, Task Lists, GitHub Flavored Tables, Links, Auto-URLs, Images, Inline Code, and multi-line Code Blocks.",
    },
    {
      question: "Is my document uploaded to a server to be processed?",
      answer: "No! The text parsing happens entirely within your local browser's memory using JavaScript, ensuring absolute privacy for your technical documents or personal writings.",
    },
    {
      question: "Why does it output Tailwind CSS classes?",
      answer: "When converting to Raw HTML, the parser injects structural CSS classes so that if you paste it into a modern web framework, the spacing, typography, and code blocks maintain their beautiful formatting without requiring a separate stylesheet.",
    },
  ];

  const handleLoadDemo = () => {
    setInputText(`# Markdown Upgrade
This parser handles **bold**, *italics*, and ~~strikethrough~~. We also support _nested **formatting**_ properly.

## Tables & Task Lists
| Feature | Supported |
|---|---|
| Auto URLs | https://example.com |
| Escapes | \\*Not Italic\\* |

- [x] Extract **Code** Blocks
- [x] Parse Images Before Links
- [ ] Learn to fly

### Nested Lists & Quotes
- Item 1
  - Nested Item 
    - Deep Nested
- Item 2

> This blockquote handles **inline formatting**
> and multiple lines easily.

---

### Code Support
\`\`\`javascript
function calculate(a, b) {
  // HTML is escaped inside here: <div>
  return a + b;
}
\`\`\`

Raw HTML works too: <span style="color: red;">Red Text</span>
`);
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 py-12 text-center sm:py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Utilities
        </Link>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Markdown <span className="text-blue-400">Previewer</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-medium text-slate-300 sm:text-base md:text-lg">
          Instantly draft, visualize, and convert Markdown text into clean HTML code.
        </p>
        <div className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 shadow-sm backdrop-blur-sm sm:text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Whenever possible, your data never leaves your device. Your security is our priority.
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-2xl border border-slate-700 bg-[#95BDD7] p-5 shadow-xl sm:p-8 lg:rounded-3xl">
          
          {/* Header Control Panel */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/20 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
                <FileCode2 className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Live Editor Engine</h2>
            </div>
            
            <div className="flex items-center gap-2">
              {!inputText && (
                <button
                  onClick={handleLoadDemo}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
                >
                  Load Demo
                </button>
              )}
              <button
                onClick={clearAll}
                disabled={!inputText}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" /> Clear All
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* LEFT SIDE: Markdown Input */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-bold text-slate-800">Raw Markdown</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your markdown here... (# for Header, ** for bold, etc.)"
                className="h-[300px] sm:h-[500px] lg:h-[650px] w-full resize-none rounded-xl border border-slate-400 bg-white p-5 font-mono text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-inner custom-scrollbar"
              />
            </div>

            {/* RIGHT SIDE: Visual Preview or HTML Output */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                
                {/* View Toggles */}
                <div className="flex bg-slate-200/80 rounded-lg p-1 border border-slate-300 shadow-sm">
                  <button
                    onClick={() => setOutputMode("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${outputMode === "preview" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    <Eye className="h-3.5 w-3.5" /> Visual Preview
                  </button>
                  <button
                    onClick={() => setOutputMode("html")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${outputMode === "html" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    <Code className="h-3.5 w-3.5" /> Raw HTML
                  </button>
                </div>

                <button
                  onClick={copyToClipboard}
                  disabled={!outputHtml}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${copied ? "bg-emerald-600" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                  {copied ? "Copied" : "Copy HTML"}
                </button>
              </div>
              
              {outputMode === "preview" ? (
                <div 
                  className="h-[300px] sm:h-[500px] lg:h-[650px] w-full overflow-y-auto rounded-xl border border-slate-300 bg-slate-100 text-slate-700 p-6 shadow-inner custom-scrollbar"
                  dangerouslySetInnerHTML={{ __html: outputHtml || '<p class="text-slate-400 italic">Your preview will appear here...</p>' }}
                />
              ) : (
                <textarea
                  readOnly
                  value={outputHtml}
                  className="h-[300px] sm:h-[500px] lg:h-[650px] w-full resize-none rounded-xl border border-slate-300 bg-slate-900 text-slate-300 p-5 font-mono text-sm focus:outline-none shadow-inner custom-scrollbar"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <ToolInfo 
        aboutDescription={aboutDescription}
        howTo={howToSteps}
        faqs={faqs}
      />
    </div>
  );
}