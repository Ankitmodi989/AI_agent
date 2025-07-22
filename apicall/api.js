import React from "react";
import { useEffect, useState,useMemo ,useRef} from "react";
// import ReactMarkdown from 'react-markdown';

export default function ApiCall({ apiKey, query }) {
    console.log(query);
    console.log(apiKey);

    const [responseText, setResponseText] = useState(null);
  
    useEffect(() => {
       
      
      const ChattingWithGemini = async (userProblem) => {
            if (!apiKey) {
                setResponseText("Please set api key first!");
                return;
            }

            const systemInstructionText = `your are a Generative AI assistant, you will answer the user query and if user asked to create a website then you will create a website for him/her and give the Live view of the website,
            if user asked to write a code in any language then you will write the code for him/her and give the code in the responseive way line by line just not write ode in paragraph format if u see ; then you will write a code in next line give a gap `;

            const History = [
                { role: 'user', parts: [{ text: userProblem }] }
            ];

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const requestBody = {
                contents: History,
                systemInstruction: {
                    parts: [{ text: systemInstructionText }]
                },
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 2000
                }
            };

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                if (!response.ok) {
                    const errorMsg = data.error?.message || `Status ${response.status}`;
                    console.error("API Error Response:", data);
                    setResponseText(`🥺 API issue: ${errorMsg}`);
                    return;
                }

                const parts = data?.candidates?.[0]?.content?.parts;
                const botReply = parts?.[0]?.text || "Sorry Babu, kuch samajh nahi aaya...";
                setResponseText(botReply);

            } catch (err) {
                console.error("Network Error:", err);
                setResponseText(`🥺 Network issue: ${err.message}`);
             }
        }

    
            ChattingWithGemini(query);
        
        
    }, [apiKey, query]);
      
   
    return (
        
            <div className="response-box " key={apiKey} >
                <h2>Gemini Response:</h2>
                <pre>{responseText}</pre>
            </div>
        
    );
}
