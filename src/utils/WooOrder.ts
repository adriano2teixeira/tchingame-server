import { OrderUnitType } from "../interfaces/order@interfaces";
import Woocommerce from "../utils/woocommerce";

export class WooOrder {
  shipping: object;
  payment_method: string;
  payment_method_title: string;
  costumer: object;

  constructor() {
    this.shipping = {
      first_name: "Tchingame",
      last_name: "Vouchers",
      address_1: "Angola, Luanda",
      address_2: "",
      city: "Luanda",
      state: "Luanda",
      postcode: "",
      country: "AO",
      email: "vouchers@tchingame.com",
      phone: "942 667 631",
    };

    this.payment_method = "cash";
    this.payment_method_title = "Pagamento na loja física";
    this.costumer = {
      firstName: "Genésia",
      lastName: "Kitumba",
      email: "genesiakitumba@gmail.com",
    };
  }

  async create(units: OrderUnitType[]) {
    try {
      const created_order = await Woocommerce.post("orders", {
        shipping: this.shipping,
        payment_method: this.payment_method,
        payment_method_title: this.payment_method_title,
        line_items: units,
        costumer: this.costumer,
      });

      return { status: 0, order: created_order.data };
    } catch (error) {
      console.log(error.message);
      return { status: 1, error: error.message };
    }
  }
}
