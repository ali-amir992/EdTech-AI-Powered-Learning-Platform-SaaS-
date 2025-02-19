import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import Spinner from '@components/common/Spinner';
import { RootState } from '@redux/store';

interface TemplateProps {
    title: string;
    description1: string;
    description2: string;
    formType: "signup" | "login";
}

const Template: React.FC<TemplateProps> = ({ title, description1, description2, formType }) => {
    const { loading } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
            {loading ? (
                <Spinner />
            ) : (
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        {title}
                    </h1>

                    {/* Description */}
                    {/* <div className="text-center mb-6">
                        <p className="text-gray-600">{description1}</p>
                        <p className="text-blue-500 italic">{description2}</p>
                    </div> */}

                    {/* Form */}
                    {formType === "signup" ? <SignupForm /> : <LoginForm />}
                </div>
            )}
        </div>
    );
};

export default Template;