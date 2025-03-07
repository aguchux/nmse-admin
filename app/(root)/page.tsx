"use client";

import React, { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
const LandingPage = () => {
    const { toasts, toast, dismiss } = useToast();
    useEffect(() => {
        toast({
            title: 'Hello',
            description: 'World',
            duration: 5000,
        });
    }, [toast]);
    return (
        <div>
            <label>Test
                <input name='jjj' type='text' />
            </label>
        </div>
    )
}

export default LandingPage