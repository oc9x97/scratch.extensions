class Discord {
    constructor() {
        this.webhookURL = ''; // Initialize with an empty string
    }

    getInfo() {
        return {
            id: 'discord',
            name: 'Discord',
            color1: '#7289DA',
            blocks: [
                {
                    opcode: 'setWebhookURL',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Set Webhook URL to [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN'
                        }
                    }
                },
                {
                    opcode: 'getWebhookURL',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Webhook URL',
                },
                {
                    opcode: 'sendWebhookMessage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Send Webhook Message [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, Scratch!'
                        }
                    }
                },
                {
                    opcode: 'deleteWebhook',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Delete Webhook',
                }
            ]
        };
    }

    setWebhookURL(args) {
        this.webhookURL = args.TEXT;
    }

    getWebhookURL() {
        return this.webhookURL;
    }

    sendWebhookMessage(args) {
        const message = args.TEXT;

        if (!this.webhookURL) {
            throw new Error('Webhook URL is not set. Please use the "Set webhook URL" block to set it.');
        }

        // Create a payload for the webhook
        const payload = {
            content: message
        };

        // Send the payload to the Discord webhook
        fetch(this.webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to send webhook message: ${response.statusText}`);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    deleteWebhook() {
        if (!this.webhookURL) {
            throw new Error('Webhook URL is not set. Please use the "Set webhook URL" block to set it.');
        }

        // Use the fetch method with the DELETE HTTP method to delete the webhook
        fetch(this.webhookURL, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete webhook: ${response.statusText}`);
            }
            this.webhookURL = ''; // Reset the webhook URL
        })
        .catch(error => {
            console.error(error);
        });
    }
}

Scratch.extensions.register(new Discord());
