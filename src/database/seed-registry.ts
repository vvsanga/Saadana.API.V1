import { AcdContentDiagram } from "../modules/academic/entities/content-diagram.entity";
import { AcdContent } from "../modules/academic/entities/content.entity";
import { AcdDiagram } from "../modules/academic/entities/diagram.entity";
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
        name: 'clients',
        entity: AppClient,
        file: 'app/clients.csv',
        transform: (row) => ({
            ...row
        }),
    },
    {
        name: 'nodes',
        entity: AppNode,
        file: 'app/nodes.csv',
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
        name: 'plans',
        entity: AppPlan,
        file: 'app/plans.csv',
        transform: (row, lookupMap) => ({
            ...row,
            // node: { id: lookupMap.get(row.node) },
        }),
    },
    {
        name: 'subjects',
        entity: AcdSyllabus,
        file: 'app/syllabus/subjects.csv',
        level: 1,
        transform: (row) => ({
            ...row,
            level: 1,
            parent: null,
            gradeFrom: parseInt(row.gradeFrom),
            gradeTo: parseInt(row.gradeTo),
            order: parseInt(row.order),
        }),
    },
    {
        name: 'units',
        entity: AcdSyllabus,
        file: 'app/syllabus/units.csv',
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
    {
        name: 'topics',
        entity: AcdSyllabus,
        file: 'app/syllabus/topics.csv',
        level: 3,
        transform: (row, lookupMap) => ({
            ...row,
            level: 3,
            parent: { id: lookupMap.get(row.parent) },
            gradeFrom: parseInt(row.gradeFrom),
            gradeTo: parseInt(row.gradeTo),
            order: parseInt(row.order),
        }),
    },
    {
        name: 'diagrams',
        entity: AcdDiagram,
        file: 'academic/diagrams.csv',
        transform: (row) => ({
            ...row
        }),
    },
    {
        name: 'content',
        entity: AcdContent,
        file: 'academic/content.csv',
        transform: (row) => ({
            ...row
        }),
    },
    {
        name: 'content-diagrams',
        entity: AcdContentDiagram,
        file: 'academic/content-diagrams.csv',
        transform: (row) => ({
            ...row
        }),
    }
];