import { useState } from 'react';
import AccountOverview from './AccountOverview';
import ProfileSection from './ProfileSection';
import OrdersSection from './OrdersSection';
import SubscriptionsSection from './SubscriptionsSection';
import FavoritesSection from './FavoritesSection';

interface AccountDashboardProps {
  userEmail: string;
  onClose?: () => void;
  initialTab?: 'overview' | 'orders' | 'profile' | 'autoship' | 'favorites';
}

type TabType = 'overview' | 'orders' | 'profile' | 'autoship' | 'favorites';
type CustomerType = 'existing' | 'new';

export default function AccountDashboard({ userEmail, onClose, initialTab }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'overview');
  const [customerType, setCustomerType] = useState<CustomerType>('existing');
  const [initialOrderId, setInitialOrderId] = useState<string | undefined>(undefined);

  const handleNavigate = (tab: TabType, orderId?: string) => {
    setActiveTab(tab);
    if (tab === 'orders' && orderId) {
      setInitialOrderId(orderId);
    } else {
      setInitialOrderId(undefined);
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'orders' as TabType, label: 'Orders' },
    { id: 'profile' as TabType, label: 'Profile' },
    { id: 'autoship' as TabType, label: 'Autoship' },
    { id: 'favorites' as TabType, label: 'Favorites' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Header with Tab Navigation */}
      <div className="bg-white">
        <div className="px-[20px] md:px-[40px]">
          {/* Debug Toggle - Temporary */}
          <div className="flex justify-end pt-[20px] pb-[12px]">
            <div className="inline-flex gap-[8px] bg-[#F6F2EC] rounded-[8px] p-[4px]">
              <button
                onClick={() => setCustomerType('existing')}
                className={`px-[16px] py-[8px] rounded-[6px] font-['Inter',sans-serif] text-[12px] uppercase tracking-[0.05em] transition-colors cursor-pointer focus:outline-none ${
                  customerType === 'existing'
                    ? 'bg-white text-[#003b3c] shadow-sm'
                    : 'text-[#406c6d] hover:text-[#003b3c]'
                }`}
              >
                Existing Customer
              </button>
              <button
                onClick={() => setCustomerType('new')}
                className={`px-[16px] py-[8px] rounded-[6px] font-['Inter',sans-serif] text-[12px] uppercase tracking-[0.05em] transition-colors cursor-pointer focus:outline-none ${
                  customerType === 'new'
                    ? 'bg-white text-[#003b3c] shadow-sm'
                    : 'text-[#406c6d] hover:text-[#003b3c]'
                }`}
              >
                New Customer
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-[40px] overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-[24px] whitespace-nowrap transition-colors cursor-pointer focus:outline-none font-['Inter',sans-serif] text-[16px] ${
                  activeTab === tab.id
                    ? 'text-[#003b3c]'
                    : 'text-[#406c6d] hover:text-[#003b3c]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#009296]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-[20px] md:px-[40px] py-[40px] md:py-[60px]">
        {activeTab === 'overview' && <AccountOverview userEmail={userEmail} onNavigate={handleNavigate} isNewCustomer={customerType === 'new'} />}
        {activeTab === 'orders' && <OrdersSection isNewCustomer={customerType === 'new'} initialOrderId={initialOrderId} />}
        {activeTab === 'profile' && <ProfileSection userEmail={userEmail} isNewCustomer={customerType === 'new'} />}
        {activeTab === 'autoship' && <SubscriptionsSection isNewCustomer={customerType === 'new'} />}
        {activeTab === 'favorites' && <FavoritesSection isNewCustomer={customerType === 'new'} />}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}