import Chatbot from '../components/Chatbot';

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">PeerMate Chatbot</h1>
      <Chatbot />
    </div>
  );
}
