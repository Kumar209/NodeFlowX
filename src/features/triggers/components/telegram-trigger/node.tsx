"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { TelegramTriggerDialog } from "./dialog";
import { fetchTelegramTriggerRealTimeToken } from "./actions";
import { TELEGRAM_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/telegram-trigger";

export const TelegramTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: TELEGRAM_TRIGGER_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchTelegramTriggerRealTimeToken,
    });
    
    const handleOpenSettings = () => setDialogOpen(true);
    
    return (
        <>
            <TelegramTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            <BaseTriggerNode
                {...props}
                icon="/telegram.svg"
                name="Telegram"
                description="When a Telegram message is received"
                status={nodeStatus}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
            />
        </>
    );
});

TelegramTriggerNode.displayName = "TelegramTriggerNode";