/* eslint-disable linebreak-style */
const _ = require("lodash");
const request = require("request");
const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");
const { addDaysToCurrentDate } = require("../utilities/dateUtility");
const { convertToNaira } = require("../utilities/paymentUtility");

const { initialisePayment, verifyPayment } = require("../utilities/paystack")(
  request,
);

class PaymentService {
  async initiatePayment(data) {
    try {
      const form = _.pick(data, [
        "amount",
        "email",
        "full_name",
        "user_id",
        "plan_name",
      ]);

      form.metadata = {
        full_name: form.full_name,
        user_id: form.user_id,
        plan_name: form.plan_name,
      };

      return new Promise((resolve, reject) => {
        initialisePayment(form, (err, body) => {
          if (err) {
            return reject({
              error: err.message,
              source: "start payment service",
            });
          }

          const response = JSON.parse(body);
          resolve(response);
        });
      });
    } catch (err) {
      err.source = "start payment service";
      throw err;
    }
  }

  async createPayment(user) {
    try {
      const { reference } = user;
      if (!reference) throw { statusCode: 400, message: "Reference not found" };

      return new Promise((resolve, reject) => {
        verifyPayment(reference, async (err, body) => {
          if (err) return reject(err.message);

          if (!body) {
            return reject({
              statusCode: 500,
              source: "create payment service",
              message: "Empty response from payment verification service",
            });
          }

          const { data } = JSON.parse(body);
          const { duration } = await Subscription.findOne({
            price: convertToNaira(data.amount),
          });

          const paymentInfo = {
            amount: data.amount,
            paid_at: data.createdAt,
            status: data.status,
            reference: data.reference,
            email: data.customer.email,
            full_name: data.metadata.full_name,
            expires_at: addDaysToCurrentDate(data.createdAt, duration),
          };

          resolve(paymentInfo);
        });
      });
    } catch (err) {
      err.source = "create payment service";
      throw err;
    }
  }

  async getPaymentReceipt(body) {
    const { id } = body;
    const transaction = await Payment.find({ user_id: id, status: true });

    return transaction;
  }
}

module.exports = PaymentService;
