import React, { useEffect } from 'react';
import IdentityCard from './IdentityCard';
import JourneyTimeline from './JourneyTimeline';
import { useCustomerStore } from '../../../store/customerStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerOrbit: React.FC = () => {
    const {
        customers,
        activeCustomerId,
        nextCustomer,
        prevCustomer,
        loadCustomers,
        isLoading,
    } = useCustomerStore();

    // Ensure we always have a customer object
    const customer = customers.find(c => c.id === activeCustomerId) || customers[0] || { timeline: [] };

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-4)',
                }}
            >
                <h2 className="text-h2">Customer Orbit</h2>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button onClick={prevCustomer} className="btn btn-ghost" style={{ padding: 'var(--space-2)' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextCustomer} className="btn btn-ghost" style={{ padding: 'var(--space-2)' }}>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <IdentityCard customer={customer} />
                <JourneyTimeline events={customer.timeline ?? []} />
            </div>
        </div>
    );
};

export default CustomerOrbit;
