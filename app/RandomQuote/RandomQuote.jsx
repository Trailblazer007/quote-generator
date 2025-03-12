"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import twitter_icon from "../../public/twitter-icon.png"
import refresh_icon from "../../public/refresh-icon.png"

export const RandomQuote = () => {
    const [quotes, setQuotes] = useState([]);

    const [quote, setQuote] = useState({
        text: "Difficulties increase the nearer we get to the goal",
        author: "Johann Wolfgang von Goethe"
    });

    // to fetch the data from an API
    useEffect(() => {
        const loadQuotes = async () => {
            try {
                const response = await fetch("https://dummyjson.com/quotes");
                const data = await response.json();
                setQuotes(data.quotes); //The API returns {quotes: [...]}
            } catch (error) {
                console.error("Error loading quotes:", error)
            }
        };

        loadQuotes();
    }, []); // Empty depedency array means this runs once on mount 

    const randomize = () => {
        if (quotes.length > 0) {
            const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(selectedQuote);
        }
    }

    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text || quote.quote} - ${quote.author}`)
    }


    return (

        <div className="bg-[#050e1d] flex justify-center items-center min-h-screen w-full min-w-max">
            {/* container */}
            <div className="holder bg-[#7587d4] p-10 rounded-md sm:mx-6 sm:min-w-[540px]">
                <div className='topic mb-4 text-xl'>
                    <h2>Random Quote Generator</h2>
                </div>

                <div className="top text-2xl text-white mb-5 pb-4 border-b-2 border-gray-700 w-96">
                    <p>{quote.text || quote.quote || "No quote available"}</p>
                </div>

                <div className="bottom flex justify-between items-center">
                    <div className="author">
                        <p>- {quote.author}</p>
                    </div>
                    <div className="icons cursor-pointer flex items-center justify-between gap-4">
                        <Image
                            onClick={() => { twitter() }}
                            src={twitter_icon}
                            height={25}
                            width={25}
                            alt="twitter link"
                        />

                        <Image
                            onClick={() => { randomize() }}
                            src={refresh_icon}
                            height={25}
                            width={25}
                            alt="refresh button"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
