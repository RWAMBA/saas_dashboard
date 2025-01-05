type Listener = () => void;

class CustomerEvents {
  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const customerEvents = new CustomerEvents(); 