import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppOrderAmount } from "./entities/app-order-amount.entity";
import { AppOrder } from "./entities/app-order.entity";
import { AppPaymentSession } from "./entities/app-payment-session.entity";
import { AppPayment } from "./entities/app-payment.entity";
import { AppSubscription } from "./entities/app-subscription.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AppOrder,
            AppPayment,
            AppOrderAmount,
            AppPaymentSession,
            AppSubscription
        ])
    ],
    providers: [
    ],
    controllers: [
    ]
})
export class OrdersModule { }
