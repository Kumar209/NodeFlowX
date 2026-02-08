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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCredentialsByType } from "@/features/credentials/hooks/use-credentials";
import { CredentialType } from "@/generated/prisma/enums";
import Image from "next/image";

const formSchema = z.object({
    variableName: z
        .string()
        .min(1, { message: "Variable name is required" })
        .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, { message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores" }),
    message: z
        .string()
        .min(1, "Message content is required")
        .max(4096, "Telegram messages cannot exceed 4096 characters"),
    chatId: z.string().optional(),
    credentialId: z.string().min(1, "Credential is required"),
});

export type TelegramFormValues = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<TelegramFormValues>;
};

export const TelegramDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {}
}: Props) => {
    const { 
        data: credentials,
        isLoading: isLoadingCredentials
    } = useCredentialsByType(CredentialType.TELEGRAM);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            variableName: defaultValues.variableName || "",
            message: defaultValues.message || "",
            chatId: defaultValues.chatId || "",
            credentialId: defaultValues.credentialId || "",
        }
    });

    // Reset form values when dialog opens with new defaults
    useEffect(() => {
        if (open) {
            form.reset({
                variableName: defaultValues.variableName || "",
                message: defaultValues.message || "",
                chatId: defaultValues.chatId || "",
                credentialId: defaultValues.credentialId || "",
            });
        }
    }, [open, defaultValues, form]);

    const watchVariableName = form.watch("variableName") || "myTelegram";

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Telegram Configuration</DialogTitle>
                    <DialogDescription>
                        Configure the Telegram message settings for this node.
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
                                                placeholder="myTelegram"
                                                {...field} 
                                                className="ml-0.5 !important"
                                            />
                                        </FormControl>
                                        <FormDescription className="ml-0.5">
                                            Use this name to reference the result in other nodes: {" "}
                                            <code>{`{{${watchVariableName}.result}}`}</code>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField
                                control={form.control}
                                name="credentialId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telegram Bot Token</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isLoadingCredentials || !credentials?.length}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a credential" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {credentials?.map((cred) => (
                                                    <SelectItem key={cred.id} value={cred.id}>
                                                        <div className="flex items-center gap-2">
                                                            <Image
                                                                src="/telegram.svg"
                                                                alt="Telegram"
                                                                width={16}
                                                                height={16}
                                                            />
                                                            {cred.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="ml-0.5">
                                            Select a Telegram bot token credential
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField
                                control={form.control}
                                name="chatId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chat ID (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123456789 or @username"
                                                {...field}
                                                className="ml-0.5 !important"
                                            />
                                        </FormControl>
                                        <FormDescription className="ml-0.5">
                                            Leave empty to use chat ID from trigger. Can be numeric ID or @username
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message Content</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Hello! {{telegram.from.first_name}}, your message: {{telegram.message.text}}"
                                                className="min-h-[100px] font-mono text-sm ml-0.5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="ml-0.5">
                                            The message to send. Use {"{{variables}}"} for dynamic content
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                        </div>

                        <DialogFooter className="mt-4">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};