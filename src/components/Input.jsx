import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        error,
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg outline-none duration-200 
                    border w-full 
                    ${className} 
                    bg-gray-800 text-white placeholder-gray-400 
                    focus:bg-gray-700 focus:border-blue-500
                    dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:bg-gray-800 dark:focus:border-blue-500`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Display error message */}
        </div>
    );
});

export default Input;
