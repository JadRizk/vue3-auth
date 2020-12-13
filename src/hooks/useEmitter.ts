import { getCurrentInstance } from 'vue'

/**
 * Custom emitter - Strictly typed
 * 
 * ✅ strictly typed emits
 * ✅ strictly typed event handlers
 * ✅ types(contracts) is located in dedicated files
 * 
 * ❌ have to use wrapper useEmitter over emit (not emit itself), 
 * that adds some overhead to your component's code, and component is 
 * highly coupled with that hook, so cannot be easily reused in project 
 * which does not contain that hook
 */
export function useEmitter<T extends Record<any, any>>() {
    const instance = getCurrentInstance()

    return function emit<K extends keyof T>(name: string, payload: T[K]) {
        if (instance !== null) {
            instance.emit(name, payload)
        }
    }
}