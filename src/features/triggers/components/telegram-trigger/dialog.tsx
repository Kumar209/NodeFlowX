"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const TelegramTriggerDialog = ({
    open,
    onOpenChange
}: Props) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    // Construct the webhook URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const webhookUrl = `${baseUrl}/api/webhooks/telegram?workflowId=${workflowId}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            toast.success("Webhook URL copied to clipboard");
        } catch {
            toast.error("Failed to copy URL");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Telegram Trigger Configuration</DialogTitle>
                    <DialogDescription>
                        Configure this webhook URL with the Telegram Bot API to trigger this workflow when messages are received.
                    </DialogDescription>
                </DialogHeader>

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
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <Label htmlFor="webhook-url">
                                Webhook URL
                            </Label>
                            <div className="flex gap-2 ml-0.5">
                                <Input id="webhook-url" value={webhookUrl} readOnly className="font-mono text-sm" />
                                <Button type="button" size="icon" variant="outline" onClick={copyToClipboard}>
                                    <CopyIcon className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-lg bg-muted p-4 space-y-2">
                            <h4 className="font-medium text-sm">Setup instructions:</h4>
                            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside ml-1">
                                <li className="mb-2">
                                    <span className="font-medium">Create your Telegram bot:</span>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                        <li>Open Telegram, search for <code className="bg-background px-1 py-0.5 rounded text-xs">@BotFather</code></li>
                                        <li>Send <code className="bg-background px-1 py-0.5 rounded text-xs">/newbot</code> to create new bot</li>
                                        <li>Choose a name for your bot (e.g., "NodeFlowX Assistant")</li>
                                        <li>Choose a username ending with "bot" (e.g., "nodeflowx_bot")</li>
                                        <li>Copy the API token shown (format: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz)</li>
                                    </ul>
                                </li>
                                <li className="mb-2">
                                    <span className="font-medium">Enable bot privacy mode:</span>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                        <li>Send <code className="bg-background px-1 py-0.5 rounded text-xs">/setprivacy</code> to @BotFather</li>
                                        <li>Select your bot from the list</li>
                                        <li>Choose <code className="bg-background px-1 py-0.5 rounded text-xs">Disable</code> so the bot can see all messages in groups/channels</li>
                                    </ul>
                                </li>
                                <li className="mb-2">
                                    <span className="font-medium">Set up the webhook:</span>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                        <li>Replace <code className="bg-background px-1 py-0.5 rounded text-xs">[YOUR_TOKEN]</code> with your bot token in this URL:</li>
                                            <code className="bg-background px-1.5 py-0.5 rounded text-xs break-all inline-block mt-1">
                                                https://api.telegram.org/bot[YOUR_TOKEN]/setWebhook?url={webhookUrl}
                                            </code>
                                        <li>Open this URL in your browser or use it in a cURL command</li>
                                    </ul>
                                </li>
                                 <li className="mb-2">
                                    <span className="font-medium">
                                        Claim bot ownership (Important):
                                    </span>

                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                         <li>
                                            Save your workflow first. Ownership binding
                                            only works after the workflow is saved.
                                        </li>
                                        <li>
                                            The first Telegram account that sends a message
                                            to this bot will become the owner.
                                        </li>
                                        <li>
                                            Only the owner can trigger this workflow.
                                        </li>
                                        <li>
                                            After setup, immediately open Telegram and send a message to your bot.
                                        </li>
                                        <li>
                                            If someone else messages your bot first, they may become the owner.
                                        </li>
                                    </ul>
                                </li>
                                <li className="mb-2">
                                    <span className="font-medium">Save credentials in NodeFlowX:</span>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                        <li>Go to Credentials section in NodeFlowX</li>
                                        <li>Click "Add Credential" → Select "Telegram"</li>
                                        <li>Paste your bot token and give it a name</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">Configure Telegram action nodes:</span>
                                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                        <li>Add Telegram action nodes to your workflow</li>
                                        <li>Select the credential you saved</li>
                                        <li>Test by sending a message to your bot on Telegram</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        <div className="rounded-lg bg-muted p-4 space-y-2">
                            <h4 className="font-medium text-sm">Available Variables</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.text}}"}
                                    </code> - Message text
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.chat.id}}"}
                                    </code> - Chat ID (for replies)
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.chat.first_name}}"}
                                    </code> - User's first name
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.chat.last_name}}"}
                                    </code> - User's last name
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.chat.username}}"}
                                    </code> - Username
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.chat.type}}"}
                                    </code> - Chat type (private/group)
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.message_id}}"}
                                    </code> - Message ID
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.message.date}}"}
                                    </code> - Message timestamp
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{telegram.text}}"}
                                    </code> - Message text (shortcut)
                                </li>
                                <li>
                                    <code className="bg-background px-1 py-0.5 rounded text-xs">
                                        {"{{json telegram}}"}
                                    </code> - Full processed message data as JSON
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}