// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CarRental {
    address public owner;
    uint256 public orderCounter;

    enum OrderStatus { PENDING, PAID, CANCELLED }

    struct Order {
        uint256 id;
        address renter;
        uint256 amount;
        OrderStatus status;
    }

    mapping(uint256 => Order) public orders;

    event OrderCreated(uint256 indexed orderId, address indexed renter, uint256 amount);
    event OrderPaid(uint256 indexed orderId);

    constructor() {
        owner = msg.sender;
    }

    function createOrder(uint256 orderId) external payable {
        require(msg.value > 0, "Payment required");

        orders[orderId] = Order({
            id: orderId,
            renter: msg.sender,
            amount: msg.value,
            status: OrderStatus.PAID
        });

        emit OrderCreated(orderId, msg.sender, msg.value);
        emit OrderPaid(orderId);
    }

    function withdraw(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.PAID, "Order not paid");
        require(msg.sender == owner, "Only owner can withdraw");

        payable(owner).transfer(order.amount);
        order.status = OrderStatus.CANCELLED;
    }
}
