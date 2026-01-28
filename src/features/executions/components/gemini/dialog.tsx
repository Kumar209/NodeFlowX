"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// export const AVAILABLE_MODELS = [
//     "gemini-2.5-flash",
//     "gemini-1.5-flash",
//     "gemini-1.5-flash-8b",
//     "gemini-1.5-pro",
//     "gemini-1.0-pro",
//     "gemini-pro",
// ] as const;

// Predefined sizes for common use cases
export const IMAGE_SIZES = [
  { label: "Square (1024x1024)", value: "1024x1024" },
  { label: "Portrait (768x1024)", value: "768x1024" },
  { label: "Landscape (1024x768)", value: "1024x768" },
  { label: "HD (1280x720)", value: "1280x720" },
  { label: "Full HD (1920x1080)", value: "1920x1080" },
  { label: "Custom", value: "custom" }
] as const;

export const ASPECT_RATIOS = [
  { label: "Square (1:1)", value: "1:1" },
  { label: "Portrait (3:4)", value: "3:4" },
  { label: "Portrait (2:3)", value: "2:3" },
  { label: "Landscape (4:3)", value: "4:3" },
  { label: "Landscape (3:2)", value: "3:2" },
  { label: "Widescreen (16:9)", value: "16:9" },
  { label: "Ultra Wide (21:9)", value: "21:9" },
] as const;

export const IMAGE_STYLES = [
  { label: "No specific style", value: "none" },
  { label: "Photorealistic", value: "photorealistic" },
  { label: "Digital Art", value: "digital art" },
  { label: "Watercolor", value: "watercolor painting" },
  { label: "Anime", value: "anime style" },
  { label: "Oil Painting", value: "oil painting" },
  { label: "Vector Art", value: "vector art" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Fantasy", value: "fantasy art" },
  { label: "Cinematic", value: "cinematic" },
] as const;

// const formSchema = z.object({
//     variableName: z
//        .string()
//        .min(1, { message : "Variable name is required"})
//        .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/ , {message:"Variable name must start with a letter or underscore and container only letters, numbers, and underscores"}),
//     // model: z.string().min(1, "Model is required"),
//     mode: z.enum(["text", "image"]).default("text"),
//     systemPrompt: z.string().optional(),
//     userPrompt: z.string().min(1, "User prompt is required"),

//     // Text settings
//     temperature: z.number().min(0).max(1).default(0.7),
//     maxTokens: z.number().min(1).max(8192).default(1024),

//     // Image settings
//     imageCount: z.number().min(1).max(4).default(1),
//     size: z.enum(["1024x1024", "768x1024", "1024x768", "1280x720", "1920x1080", "custom"]).default("1024x1024"),
//     customSize: z.string()
//         .regex(/^\d+x\d+$/, { message: "Must be in format WIDTHxHEIGHT (e.g., 1024x768)" })
//         .optional()
//         .refine(val => {
//         if (!val) return true;
//         const [width, height] = val.split('x').map(Number);
//         return width > 0 && height > 0 && width <= 4096 && height <= 4096;
//         }, { message: "Width and height must be between 1 and 4096" }),

//     aspectRatio: z.enum(["1:1", "3:4", "2:3", "4:3", "3:2", "16:9", "21:9", "custom"]).optional(),
//     customAspectRatio: z.string()
//         .regex(/^\d+:\d+$/, { message: "Must be in format WIDTH:HEIGHT (e.g., 16:9)" })
//         .optional(),

//     outputFormat: z.enum(["png", "jpeg", "webp"]).default("png"),
//     style: z.string().optional(),
// });

// Define the form schema with ALL fields as optional for default values


const formSchema = z.object({
    variableName: z
       .string()
       .min(1, { message: "Variable name is required" })
       .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
            message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores"
        }),
    mode: z.enum(["text", "image"]),
    systemPrompt: z.string().optional(),
    userPrompt: z.string().min(1, "User prompt is required"),

    // Text settings
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(1).max(8192),

    // Image settings
    imageCount: z.number().min(1).max(4),
    size: z.enum(["1024x1024", "768x1024", "1024x768", "1280x720", "1920x1080", "custom"]),
    customSize: z.string()
        .regex(/^\d+x\d+$/, { message: "Must be in format WIDTHxHEIGHT (e.g., 1024x768)" })
        .optional()
        .refine(val => {
            if (!val) return true;
            const [width, height] = val.split('x').map(Number);
            return width > 0 && height > 0 && width <= 4096 && height <= 4096;
        }, { message: "Width and height must be between 1 and 4096" }),
    aspectRatio: z.enum(["1:1", "3:4", "2:3", "4:3", "3:2", "16:9", "21:9", "custom"]),
    customAspectRatio: z.string()
        .regex(/^\d+:\d+$/, { message: "Must be in format WIDTH:HEIGHT (e.g., 16:9)" })
        .optional(),
    outputFormat: z.enum(["png", "jpeg", "webp"]),
    style: z.string().optional(),
});



export type GeminiFormValues = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<GeminiFormValues>;
};

export const GeminiDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {}
}: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: "",
            mode: "text",
            systemPrompt: "",
            userPrompt: "",
            temperature: 0.7,
            maxTokens: 1024,
            imageCount: 1,
            size: "1024x1024",
            aspectRatio: "1:1",
            outputFormat: "png",
            style: undefined,
            ...defaultValues // Spread defaultValues last to override defaults
        }
    });

    //Reset form values when dialog opens with new defaults
    useEffect(() => {
        if(open){
            form.reset({
                variableName: "",
                mode: "text",
                systemPrompt: "",
                userPrompt: "",
                temperature: 0.7,
                maxTokens: 1024,
                imageCount: 1,
                size: "1024x1024",
                aspectRatio: "1:1",
                outputFormat: "png",
                style: "",
                ...defaultValues
            });
        }
    }, [open, defaultValues, form]);

    // Watch values for dynamic updates
    const watchVariableName = form.watch("variableName") || "myGeminiCall";
    const watchMode = form.watch("mode");
    const watchSize = form.watch("size");
    const watchAspectRatio = form.watch("aspectRatio");
    
    const showCustomSize = watchSize === "custom";
    const showCustomAspectRatio = watchAspectRatio === "custom";

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
         // Convert "none" to undefined for style
        const processedValues = {
            ...values,
            style: values.style === "none" ? undefined : values.style
        };

        onSubmit(processedValues);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Gemini Configuration</DialogTitle>
                    <DialogDescription>
                        Configure AI text or image generation for this node.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSubmit)}
                      className="space-y-8 mt-4 flex flex-col flex-1 overflow-hidden"
                    >
                        <div 
                            className="flex-1 overflow-y-auto pr-4 space-y-6
                                        [&::-webkit-scrollbar]:w-1
                                        [&::-webkit-scrollbar-track]:bg-transparent
                                        [&::-webkit-scrollbar-thumb]:bg-border
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/50
                                        [scrollbar-width]:thin
                                        [scrollbar-color]:hsl(var(--border)/0.3)_transparent"
                        >

                            {/* Mode Selection */}
                            <FormField
                                control={form.control}
                                name="mode"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Generation Type</FormLabel>
                                    <FormControl>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="text-mode"
                                            value="text"
                                            checked={field.value === "text"}
                                            onChange={() => field.onChange("text")}
                                            className="h-4 w-4"
                                        />
                                        <label htmlFor="text-mode" className="text-sm font-medium">
                                            Text Generation
                                        </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="image-mode"
                                            value="image"
                                            checked={field.value === "image"}
                                            onChange={() => field.onChange("image")}
                                            className="h-4 w-4"
                                        />
                                        <label htmlFor="image-mode" className="text-sm font-medium">
                                            Image Generation
                                        </label>
                                        </div>
                                    </div>
                                    </FormControl>
                                    <FormDescription className="ml-0.5">
                                    Generate text using Gemini or images using Imagen
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )} 
                            />




                            <FormField
                                control={form.control}
                                name="variableName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variable Name</FormLabel>

                                        <FormControl>
                                            <Input 
                                            placeholder="myGeminiCall"
                                            {...field} 
                                            className="ml-0.5 !important"
                                            />
                                        </FormControl>
                                        <FormDescription className="ml-0.5">
                                            Use this name to reference the result:{" "}
                                            {watchMode === "text" 
                                                ? `{{${watchVariableName}.text}}`
                                                : `{{${watchVariableName}.firstImage}}`}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />


                            {/* <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <Select
                                         onValueChange={field.onChange}
                                         defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full ml-0.5" >
                                                    <SelectValue placeholder="Select a model" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {
                                                    AVAILABLE_MODELS.map((model) => (
                                                        <SelectItem key={model} value={model}>
                                                            {model}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>

                                        </Select>
                                        
                                        <FormDescription className="ml-0.5">
                                            The Google Gemini model to use for completion
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            /> */}

                            <FormField
                                control={form.control}
                                name="systemPrompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>System Prompt (Optional)</FormLabel>

                                        <FormControl>
                                            <Textarea 
                                            placeholder={
                                                watchMode === "text" 
                                                    ? "You are a helpful assistant."
                                                    : "You are an AI image generator. Generate high-quality, detailed images."
                                                }
                                            className="min-h-[80px] font-mono text-sm ml-0.5"
                                            {...field}
                                            />
                                            </FormControl>
                                            <FormDescription className="ml-0.5">
                                                Sets the behavior of the assistant. Use {"{{variable}}"} for simple values or {"{{json variable}}"} to stringify objects.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                            />

                            <FormField
                                control={form.control}
                                name="userPrompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {watchMode === "text" ? "User Prompt" : "Image Description"}
                                        </FormLabel>

                                        <FormControl>
                                            <Textarea 
                                            placeholder={
                                                watchMode === "text"
                                                    ? "Summarize this text: {{json httpResponse.data}}"
                                                    : "A beautiful landscape with mountains and a lake at sunset, digital art style, 4k, highly detailed"
                                                }
                                            className="min-h-[120px] font-mono text-sm ml-0.5"
                                            {...field}
                                            />
                                            </FormControl>
                                            <FormDescription className="ml-0.5">
                                                {watchMode === "text" 
                                                    ? "The prompt to send to the AI. Use {'{{variable}}'} for simple values or {'{{json variable}}'} to stringify objects."
                                                    : "Be specific! Include style, subject, colors, lighting, mood, etc. Use {'{{variable}}'} for context."
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                            />

                            {/* Text Generation Settings - Make responsive */}
                            {watchMode === "text" && (
                                <div className="space-y-4 border rounded-lg p-4">
                                <h3 className="text-sm font-semibold">Text Generation Settings</h3>
                                    {/* Use responsive grid - flex-col on mobile, grid-cols-2 on md+ */}
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="temperature"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Temperature</FormLabel>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                    <Slider
                                                        min={0}
                                                        max={1}
                                                        step={0.1}
                                                        value={[field.value]}
                                                        onValueChange={([value]) => field.onChange(value)}
                                                    />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>Precise (0)</span>
                                                        <span className="font-medium">{field.value}</span>
                                                        <span>Creative (1)</span>
                                                    </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Controls randomness (0 = deterministic, 1 = creative)
                                                </FormDescription>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="maxTokens"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Max Tokens</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                    type="number"
                                                    min={1}
                                                    max={8192}
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1024)}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Maximum length of response
                                                </FormDescription>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}



                            {/* Image Generation Settings - Make responsive for custom size/ratio */}
                            {watchMode === "image" && (
                                <div className="space-y-4 border rounded-lg p-4">
                                    <h3 className="text-sm font-semibold">Image Generation Settings</h3>
                                    
                                    {/* Make image count and format responsive */}
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="imageCount"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Number of Images</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-4">
                                                    <Slider
                                                        min={1}
                                                        max={4}
                                                        step={1}
                                                        value={[field.value]}
                                                        onValueChange={([value]) => field.onChange(value)}
                                                        className="flex-1"
                                                    />
                                                    <span className="text-sm font-medium w-8">{field.value}</span>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Generate 1-4 images at once
                                                </FormDescription>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="outputFormat"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Output Format</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select format" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    <SelectItem value="png">PNG (High Quality)</SelectItem>
                                                    <SelectItem value="jpeg">JPEG (Smaller Size)</SelectItem>
                                                    <SelectItem value="webp">WebP (Modern)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Make size and custom size responsive */}
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="size"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Image Size</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select size" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    {IMAGE_SIZES.map((size) => (
                                                        <SelectItem key={size.value} value={size.value}>
                                                        {size.label}
                                                        </SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {showCustomSize && (
                                            <FormField
                                                control={form.control}
                                                name="customSize"
                                                render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                    <FormLabel>Custom Size</FormLabel>
                                                    <FormControl>
                                                    <Input 
                                                        placeholder="1920x1080" 
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                    </FormControl>
                                                    <FormDescription>
                                                    Width x Height (max 4096x4096)
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>

                                    {/* Make aspect ratio and custom aspect ratio responsive */}
                                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="aspectRatio"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                <FormLabel>Aspect Ratio</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select aspect ratio" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    {ASPECT_RATIOS.map((ratio) => (
                                                        <SelectItem key={ratio.value} value={ratio.value}>
                                                        {ratio.label}
                                                        </SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {showCustomAspectRatio && (
                                            <FormField
                                                control={form.control}
                                                name="customAspectRatio"
                                                render={({ field }) => (
                                                <FormItem className="md:col-span-1">
                                                    <FormLabel>Custom Aspect Ratio</FormLabel>
                                                    <FormControl>
                                                    <Input 
                                                        placeholder="16:9" 
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                    </FormControl>
                                                    <FormDescription>
                                                    Width:Height ratio
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>

                                    {/* Fix the style field - handle undefined values */}
                                    <FormField
                                        control={form.control}
                                        name="style"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Art Style (Optional)</FormLabel>
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    value={field.value || "none"}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a style or enter custom" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {IMAGE_STYLES.map((style) => (
                                                            <SelectItem key={style.value} value={style.value}>
                                                                {style.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormControl>
                                                <Input
                                                    placeholder="Enter custom style (e.g., 'steampunk', 'impressionist')"
                                                    value={field.value === "none" ? "" : field.value || ""}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        // Always update when user types, regardless of whether it matches predefined styles
                                                        if (value === "") {
                                                            // If user clears the input, set to "none"
                                                            field.onChange("none");
                                                        } else {
                                                            // Otherwise, set to whatever they typed
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                    className="mt-2"
                                                />
                                                </FormControl>
                                                <FormDescription>
                                                    Artistic style for the generated images
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Tips for image generation */}
                                    <div className="bg-muted/50 p-3 rounded text-sm">
                                        <h4 className="font-medium mb-1">💡 Tips for Better Images:</h4>
                                        <ul className="space-y-1 text-muted-foreground">
                                        <li>• Include style: "digital art", "photorealistic", "watercolor"</li>
                                        <li>• Specify lighting: "golden hour", "studio lighting"</li>
                                        <li>• Add details: "highly detailed", "4k resolution", "intricate"</li>
                                        <li>• Mention colors: "vibrant colors", "pastel palette"</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="submit" >Save</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
