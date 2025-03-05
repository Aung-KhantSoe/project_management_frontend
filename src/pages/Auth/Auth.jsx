import React, { useEffect, useState } from 'react';
import { Signup } from './Signup';
import { Login } from './Login';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/Redux/Auth/Action';
import { store } from '@/Redux/Store';

export const Auth = () => {
    const [active, setActive] = useState(true); // Toggle between Signup and Login

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex rounded-xl bg-gray-300">
                <div className="bg-white rounded-xl shadow-2xl shadow-[#14173b] w-full max-w-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="p-8">
                        <div className="space-y-6">
                            {/* Render Signup or Login component based on `active` state */}
                            {active ? <Signup /> : <Login />}

                            {/* Toggle between Signup and Login */}
                            <div className="text-center">
                                <span className="text-gray-600">
                                    {active ? "Already have an account?" : "Don't have an account?"}
                                </span>
                                <Button
                                    variant="ghost"
                                    className="ml-5"
                                    onClick={() => setActive(!active)}
                                >
                                    {active ? "Sign In" : "Sign Up"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};