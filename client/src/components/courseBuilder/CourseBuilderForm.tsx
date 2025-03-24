import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { updateCourseDetails, setStep } from "@/store/slices/courseBuilderSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {apiConnector} from "@/services/apiConnector";
import { categoryEndpoints, courseEndpoints } from "@/services/apis";
import { ICategory } from "@/types/Category";

interface CourseDetailsFormInputs {
    title: string;
    description: string;
    price: number;
    language: string;
    thumbnail: FileList; 
    category: string; 
}

const CourseDetailsForm = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useAppDispatch();
    const courseDetails = useSelector((state: RootState) => state.courseBuilder.courseDetails);
    
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiConnector({
                    method: "GET",
                    url: categoryEndpoints.GET_ALL_CATEGORIES,
                });

                if (response?.data?.success) {
                    setCategories(response.data.categories);
                } else {
                    throw new Error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [token]);

    const { register, handleSubmit } = useForm<CourseDetailsFormInputs>({
        defaultValues: {
            title: courseDetails.title || "",
            description: courseDetails.description || "",
            price: courseDetails.price || 0,
            language: courseDetails.language || "",
            category: courseDetails.category?.name || "", 
        },
    });

    const onSubmit = (data: CourseDetailsFormInputs) => {
        // Create an object for Redux (without FormData)
        const courseDetails = {
            title: data.title,
            description: data.description,
            price: data.price,
            language: data.language,
            category: data.category,
            thumbnail: data.thumbnail[0], // Store file reference, NOT FormData
            sections: [],
        };
    
        // Dispatch the plain object to Redux
        // dispatch(updateCourseDetails(courseDetails)); 
    
        // Create FormData only for API submission
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("language", data.language);
        formData.append("category", data.category);
        
        if (data.thumbnail.length > 0) {
            formData.append("thumbnail", data.thumbnail[0]);
        }
    
        dispatch(setStep(2));
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} placeholder="Course Title" required />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} placeholder="Course Description" required />
            </div>
            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" {...register("price")} placeholder="Course Price" required />
            </div>
            <div>
                <Label htmlFor="language">Language</Label>
                <Input id="language" {...register("language")} placeholder="Course Language" required />
            </div>
            <div>
                <Label htmlFor="category">Category</Label>
                <select id="category" {...register("category")} required className="border p-2 rounded w-full">
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input id="thumbnail" type="file" {...register("thumbnail")} required />
            </div>
            <Button type="submit">Next</Button>
        </form>
    );
};

export default CourseDetailsForm;
