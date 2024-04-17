import ChatbotHeader from '@/app/common/components/chatbot-components/chatbot-header/chatbotHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="h-[80px] w-full transition-all duration-300 ease-in-out delay-150">
        <ChatbotHeader />
      </div>
      <div>{children}</div>
    </div>
  );
}
