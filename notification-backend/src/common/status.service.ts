import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
    private readonly statusMap = new Map<string, string>();

    updateStatus(id: string, status: string) {
        console.log(`Atualizando status para ${id}: ${status}`);
        this.statusMap.set(id, status);
    }

    getStatus(id: string): { status: string } {
        const status = this.statusMap.get(id) || 'AGUARDANDO_PROCESSAMENTO';
        return { status };
    }

    getAllStatuses(): { uuid: string; status: string }[] {
        const allStatuses: { uuid: string; status: string }[] = [];
        this.statusMap.forEach((status, uuid) => {
            allStatuses.push({ uuid, status });
        });
        return allStatuses;
    }

}
