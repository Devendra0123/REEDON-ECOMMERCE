'use client'

import { useState } from 'react';
import classNames from 'classnames';
import { questions } from '@/utils/faq';

function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  function toggleQuestion(id: any) {
    setActiveQuestion(activeQuestion === id ? null : id);
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      </div>
      <div className="w-[95%] md:w-[70%] mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-gray-200">
          {questions.map((q,index) => (
            <div key={q.id} className="py-8">
              <div className="flex justify-between">
                <h2
                  onClick={() => toggleQuestion(q.id)}
                  className="text-xl font-bold font-poppins text-gray-900 cursor-pointer"
                >
                 {index + 1}. {q.question}
                </h2>
                <svg
                  className={classNames('h-6 w-6 transform', {
                    'rotate-180': activeQuestion === q.id,
                  })}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div
                className={classNames('mt-4', {
                  'hidden': activeQuestion !== q.id,
                  'block': activeQuestion === q.id,
                })}
              >
                <p className="text-base font-poppins font-medium text-lg text-gray-800">{q.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
