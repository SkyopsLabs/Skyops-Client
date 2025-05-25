import useColorMode from "@/hooks/useColorMode";
import Markdown from "markdown-to-jsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeComponent({ code }: { code: string }) {
  const messageParts = code.split(/```/);
  const { colorMode } = useColorMode();
  return (
    <section className="no-scrollbar bord w-full overflow-x-hidden pb-[100x] text-white">
      {messageParts.map((part, i) =>
        i % 2 === 0 ? (
          <Markdown
            key={i}
            options={{ wrapper: "aside", forceWrapper: true }}
            className={`mono no-scrollbar max-w-full  flex-1   whitespace-pre-wrap pb-5 leading-loose text-appBlack prose-h1:mb-2 prose-h1:text-3xl  prose-h2:text-2xl prose-blockquote:text-xs prose-blockquote:font-semibold prose-blockquote:italic prose-ol:list-decimal prose-ul:list-disc prose-li:my-2 prose-li:ml-6 dark:text-white`}
            // className='whitespace-pre-wrap prose lg:prose-xl text-white'
          >
            {part}
          </Markdown>
        ) : colorMode == "dark" ? (
          <SyntaxHighlighter
            language="rust"
            customStyle={{
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              marginTop: 24,
            }}
            key={i}
            style={stackoverflowDark}
          >
            {part}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            language="rust"
            customStyle={{
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              marginTop: 24,
            }}
            key={i}
            style={stackoverflowDark}
          >
            {part}
          </SyntaxHighlighter>
        ),
      )}
    </section>
  );
}
