import React from 'react';

export const Timeline = ({ criticalPath, getIssueDetailsById }) => {
    return (
        <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-8">
                {criticalPath.map((issueId, index) => {
                    const issueDetails = getIssueDetailsById(issueId);
                    return (
                        <div key={index} className="flex-shrink-0">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <div className="h-16 w-px bg-gray-300"></div>
                                <div className="text-center">
                                    {issueDetails ? (
                                        <div>
                                            <strong>{issueDetails.title}</strong>
                                            <p>{issueDetails.description}</p>
                                            <p>Duration: {issueDetails.estimatedTime} hours</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <strong>Issue ID:</strong> {issueId}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};