import { Column, Entity } from 'typeorm';
import { BaseCreateEntity } from '../../../../core/base/entities/base-create.entity';
import { EstablishEra, LeaderTitle, MemberDetail, MemberType, OrgCategory, OrgScope, OrgStatus, OrgType } from '../models/meta.org.model';

@Entity({ name: 'Meta_Global_Orgs' })
export class MetaGlobalOrg extends BaseCreateEntity {

    @Column({ length: 50, nullable: true })
    abbr?: string;

    @Column({ length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    officialName?: string;

    @Column({ type: 'text', nullable: true })
    formerName?: string;

    @Column({ type: 'text', nullable: true })
    altNames?: string; // alternateNames

    @Column({ type: 'char', length: 1, nullable: true })
    establishEra?: EstablishEra;

    @Column({ type: 'char', length: 1, nullable: true })
    status?: OrgStatus;

    @Column({ type: 'int', nullable: true })
    dissolveYear?: number;

    @Column({ type: 'int', nullable: true })
    foundYear?: number;

    @Column({ type: 'date', nullable: true })
    foundDate?: Date;

    @Column({ length: 255, nullable: true })
    foundPlace?: string;

    @Column({ length: 150, nullable: true })
    headquartersCity?: string;

    @Column({ type: 'char', length: 2, nullable: true })
    headquartersCountry?: string;

    @Column({ type: 'char', length: 1, nullable: true })
    type?: OrgType;

    @Column({ type: 'char', length: 1, nullable: true })
    category?: OrgCategory;

    @Column({ type: 'char', length: 1, nullable: true })
    scope?: OrgScope;

    @Column({ type: 'int', nullable: true })
    memberCount?: number;

    @Column({ type: 'char', length: 1, nullable: true })
    memberType?: MemberType;

    @Column({ type: 'char', length: 1, nullable: true })
    memberDetail?: MemberDetail;

    @Column({ type: 'int', nullable: true })
    memberPermanent?: number;

    @Column({ type: 'char', length: 1, nullable: true })
    leaderTitle?: LeaderTitle;

    @Column({ type: 'text', nullable: true })
    primaryFunction?: string;

    @Column({ type: 'text', nullable: true })
    secondaryFunctions?: string;

    @Column({ type: 'text', nullable: true })
    keyObjectives?: string;

    @Column({ type: 'text', nullable: true })
    famousFor?: string;

    @Column({ default: false })
    isUnBody?: boolean;

    @Column({ length: 255, nullable: true })
    parentOrg?: string;

    @Column({ type: 'text', nullable: true })
    affiliatedOrg?: string;

    @Column({ length: 150, nullable: true })
    officialLanguage?: string;

    @Column({ length: 255, nullable: true })
    website?: string;

    @Column({ length: 500, nullable: true })
    logoUrl?: string;

    @Column({ length: 150, nullable: true })
    decisionMakingBody?: string;

    @Column({ type: 'text', nullable: true })
    remark?: string;
}
