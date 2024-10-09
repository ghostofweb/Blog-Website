import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Check if userData is valid before allowing form submission
    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.error('User data is not available');
            return; // Stop execution if userData is not valid
        }

        const postData = {
            ...data,
            userId: userData.$id, // Ensure userId is included in the post data
        };

        if (post) {
            // Update existing post logic
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            try {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...postData,
                    featuredImage: file ? file.$id : post.featuredImage, // Keep old image if no new image is uploaded
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        } else {
            // Logic for creating a new post
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    postData.featuredImage = file.$id; // Assign the uploaded file ID
                }

                const dbPost = await appwriteService.createPost(data.slug, postData); // Ensure slug and postData are passed correctly

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Conditional rendering for the form based on userData
    if (!userData || !userData.$id) {
        return <div>User is not authenticated. Please log in.</div>;
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {errors.title && <span className="text-red-500">Title is required.</span>} {/* Title error message */}
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <span className="text-red-500">Slug is required.</span>} {/* Slug error message */}

                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {errors.content && <span className="text-red-500">Content is required.</span>} {/* Content error message */}
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {errors.image && <span className="text-red-500">Featured image is required.</span>} {/* Featured image error message */}
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {/* Button Container */}
                <div className="mt-4">
                    <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
