
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';       // For enhanced Markdown features
import rehypeHighlight from 'rehype-highlight'; // For code block syntax highlighting
import 'highlight.js/styles/github.css';  // Code block theme

const Markdown = ({text }) => {
    return (
        
        <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ node, ...props }) => <h1 style={{ color: '#0078FF' }} {...props} />,
                h2: ({ node, ...props }) => <h2 style={{ color: '#0056b3' }} {...props} />,
                code({ inline, className, children, ...props }) {
                    return inline ? (
                        <code style={{
                            backgroundColor: '#eaeaea',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            color: '#d63384'
                        }}>
                            {children}
                        </code>
                    ) : (
                        <pre className={className} {...props}>
                            <code>{children}</code>
                        </pre>
                    );
                }
            }}
        />
    );
};

export default Markdown;
