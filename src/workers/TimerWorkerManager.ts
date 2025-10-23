let instance: TimerWorkerManage | null = null;

export class TimerWorkerManage {
    private worker: Worker;

    private constructor() {
        this.worker =  new Worker(new URL('./timerWorker.js', import.meta.url));
    }

    static getInstance(){
        if (!instance) {
            instance = new TimerWorkerManage();
        }

        return instance;
    }

    postMessage(message: any){
        this.worker.postMessage(message);
    }

    onmessage(cb: (e:  MessageEvent) => void){
        this.worker.onmessage = cb;
    }

    terminate() {
        this.worker.terminate()
        instance = null;
    }

}