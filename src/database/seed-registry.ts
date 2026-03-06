import { AcdSyllabus } from "../modules/academic/entities/syllabus.entity";
import { AppNode } from "../modules/infra/entities/app-node.entity";
import { AppPlan } from "../modules/infra/entities/app-plan.entity";
import { AppClient } from "../modules/security/entities/app-client.entity";

export interface SeedTask {
    name: string;
    entity: any;
    file: string;
    level?: number; // Optional: Only for hierarchical/parent-child data
    transform: (row: any, lookupMap: Map<string, number>) => any;
}

export const SeedRegistry: SeedTask[] = [
    {
        name: 'AppClients',
        entity: AppClient,
        file: 'app/app_clients.csv',
        transform: (row) => ({
            ...row
        }),
    },
    {
        name: 'AppNodes',
        entity: AppNode,
        file: 'app/app_nodes.csv',
        transform: (row, map) => {
            // Helper to safely parse the meta string
            const parseMeta = (val: string) => {
                try {
                    // If row is empty or "[]", JSON.parse handles it. 
                    // If it's undefined, return empty array.
                    return val ? JSON.parse(val) : undefined;
                } catch (e) {
                    return undefined;
                }
            };

            return {
                master: row.master,
                order: Number(row.order) || 0,
                label: row.label,
                avatar: row.avatar || null,
                description: row.description || null,
                // Convert string "false"/"true" to actual Boolean
                protected: row.protected === 'true' || row.protected === '1',
                // Convert the string "['A']" to a real JS Array ['A']
                meta: parseMeta(row.meta),
            };
        }
    },
    {
        name: 'AppPlans',
        entity: AppPlan,
        file: 'app/app_plans.csv',
        transform: (row, lookupMap) => ({
            ...row,
            // node: { id: lookupMap.get(row.node) },
        }),
    },
    {
        name: 'Subjects',
        entity: AcdSyllabus,
        file: 'app/syllabus/subjects.csv',
        level: 0,
        transform: (row) => ({
            ...row,
            level: 0,
            parent: null,
            gradeFrom: parseInt(row.gradeFrom),
            gradeTo: parseInt(row.gradeTo),
            order: parseInt(row.order),
        }),
    },
    {
        name: 'Units',
        entity: AcdSyllabus,
        file: 'app/syllabus/units.csv',
        level: 1,
        transform: (row, lookupMap) => ({
            ...row,
            level: 1,
            parent: { id: lookupMap.get(row.parent) },
            gradeFrom: parseInt(row.gradeFrom),
            gradeTo: parseInt(row.gradeTo),
            order: parseInt(row.order),
        }),
    },
    {
        name: 'Topics',
        entity: AcdSyllabus,
        file: 'app/syllabus/topics.csv',
        level: 2,
        transform: (row, lookupMap) => ({
            ...row,
            level: 2,
            parent: { id: lookupMap.get(row.parent) },
            gradeFrom: parseInt(row.gradeFrom),
            gradeTo: parseInt(row.gradeTo),
            order: parseInt(row.order),
        }),
    },
];