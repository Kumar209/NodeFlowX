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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    variableName: z
       .string()
       .min(1, { message : "Variable name is required"})
       .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/ , {message:"Variable name must start with a letter or underscore and container only letters, numbers, and underscores"}),
    content: z
      .string()
      .min(1, "Message content is required"),
    webhookUrl: z.string().min(1, "Webhook URL is required")
});


export type SlackFormValues = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<SlackFormValues>;
};

export const SlackDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {}
}: Props) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: defaultValues.variableName || "",
            content: defaultValues.content || "",
            webhookUrl: defaultValues.webhookUrl || ""
        }
    });

    //Reset form values when dialog opens with new defaults
    useEffect(() => {
        if(open){
            form.reset({
                variableName: defaultValues.variableName || "",
                content: defaultValues.content || "",
                webhookUrl: defaultValues.webhookUrl || ""
            })
        }
    }, [open, defaultValues, form])

    const watchVariableName = form.watch("variableName") || "mySlack";

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Slack Configuration</DialogTitle>
                    <DialogDescription>
                        Configure the Slack webhook settings for this node.
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
                            <FormField
                                control={form.control}
                                name="variableName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variable Name</FormLabel>

                                        <FormControl>
                                            <Input 
                                            placeholder="mySlack"
                                            {...field} 
                                            className="ml-0.5 !important"
                                            />
                                        </FormControl>
                                        <FormDescription className="ml-0.5">
                                            Use this name to reference the result in other nodes:{" "} {`{{${watchVariableName}.text}}`}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField
                                control={form.control}
                                name="webhookUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Webhook Url</FormLabel>
                                        <FormControl>
                                            <Input
                                              placeholder="https://hooks.slack.com/services/..."
                                              {...field}
                                              className="ml-0.5 !important"
                                            />
                                        </FormControl>
                                        <div className="ml-0.5">
                                            <div className="space-y-3">
                                                <div className="rounded-lg bg-muted p-4 space-y-2">
                                                    <h4 className="font-medium text-sm">Instructions to get Webhook Url:</h4>
                                                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside pl-4">
                                                        <li>Go to Slack → Click "+" on left sidebar → Select "Workflows"</li>
                                                        <li>Click "New workflow" → "Build workflow" → Choose "From a webhook"</li>
                                                        <li>
                                                            <span className="font-medium">Important:</span> Setup Variables → Key must be 
                                                            <code className="mx-1 px-1.5 py-0.5 bg-gray-100 rounded text-red-600 font-mono text-xs">"content"</code>
                                                            → Type = "Text" → Save → Continue
                                                        </li>
                                                        <li>Configure step: "Send a message to channel"</li>
                                                        <li>
                                                            Select channel and add message using "Insert Variable" → must select
                                                            <code className="mx-1 px-1.5 py-0.5 bg-gray-100 rounded text-red-600 font-mono text-xs">"content"</code>
                                                        </li>
                                                        <li>Click "Finish up" → Publish → "Add to channel"</li>
                                                        <li>Click on your webhook and copy the URL</li>
                                                    </ol>
                                                    <p className="font-medium text-amber-600 text-sm">
                                                        Note: Slack webhooks require a paid Slack plan.
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />                            

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message Content</FormLabel>

                                        <FormControl>
                                            <Textarea 
                                            placeholder="Summary: {{myGemini.text}}"
                                            className="min-h-[80px] font-mono text-sm ml-0.5"
                                            {...field}
                                            />
                                            </FormControl>
                                            <FormDescription className="ml-0.5">
                                                The message to send. Use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                            /> 
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
