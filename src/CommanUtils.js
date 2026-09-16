export const ConversationType = {
    PRIVATE: 'private',
    GROUP: 'group'
}
export const MessageType = {
    text: "text",
    image: "image",
    video: "video",
    audio: "audio",
    file: "file"
}
export const getTimeText = (createdAt) => {
    const formattedTime = new Date(createdAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return formattedTime
}