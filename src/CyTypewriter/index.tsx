import React, { useState, useEffect, type FC } from 'react';

// 定义 Props 类型
interface IProps {
  /**
   * The content to be typed. Can include HTML tags.
   * Note: This content is rendered using dangerouslySetInnerHTML.
   * Ensure it is trusted to avoid XSS vulnerabilities.
   */
  content: string;
  /** Whether the typing animation should repeat after finishing. */
  isRepeat?: boolean;
  /** Custom class name for the container element. */
  className?: string;
  /** Custom styles for the container element. */
  style?: React.CSSProperties;
}

const Typewriter: FC<IProps> = ({ content, isRepeat = false, ...rest }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [key, setKey] = useState(0); // A key to force re-triggering the effect for repeats

  useEffect(() => {
    setIsCompleted(false);
    let progress = 0;

    const timer = setInterval(() => {
      // If the current character is the start of an HTML tag, skip to the end of it
      if (content[progress] === '<') {
        const closingTagIndex = content.indexOf('>', progress);
        if (closingTagIndex !== -1) {
          progress = closingTagIndex + 1;
        } else {
          progress++; // Fallback for malformed HTML
        }
      } else {
        progress++;
      }

      const currentSubstring = content.substring(0, progress);
      // Add a blinking cursor effect while typing
      const cursor = progress < content.length && (progress & 1) ? '_' : '';
      setDisplayedContent(currentSubstring + cursor);

      // When typing is finished
      if (progress >= content.length) {
        clearInterval(timer);
        setDisplayedContent(content); // Ensure final content is clean (no cursor)
        setIsCompleted(true);
      }
    }, 75);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [content, key]); // Effect depends on content and the repeat key

  // Effect to handle the repeat logic
  useEffect(() => {
    if (isCompleted && isRepeat) {
      const repeatTimer = setTimeout(() => {
        setKey((prevKey) => prevKey + 1); // Trigger a re-run of the typing effect
      }, 1000); // Wait 1 second before repeating

      return () => clearTimeout(repeatTimer);
    }
  }, [isCompleted, isRepeat]);

  // Using a `span` for better inline behavior, but a `p` tag is also fine.
  // The content is dangerous, so it must be trusted.
  return <span dangerouslySetInnerHTML={{ __html: displayedContent }} {...rest} />;
};

export default Typewriter;
