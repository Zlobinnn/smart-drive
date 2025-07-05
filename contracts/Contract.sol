// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CarRental {
    address public platformOwner;

    enum OrderStatus { PENDING, PAID, COMPLETED, CANCELLED }

    struct Order {
        uint256 id;
        address renter;
        address ownerOfCar;
        uint256 amount;
        OrderStatus status;
        bool renterConfirmed;
        bool ownerConfirmed;
    }

    mapping(uint256 => Order) public orders;

    event OrderCreated(uint256 indexed orderId, address indexed renter, address indexed ownerOfCar, uint256 amount);
    event OrderConfirmed(uint256 indexed orderId, address indexed confirmer);
    event OrderCompleted(uint256 indexed orderId);

    constructor() {
        platformOwner = msg.sender;
    }

    function createOrder(uint256 orderId, address ownerOfCar) external payable {
        require(msg.value > 0, "Payment required");
        require(orders[orderId].id == 0, "Order already exists");

        orders[orderId] = Order({
            id: orderId,
            renter: msg.sender,
            ownerOfCar: ownerOfCar,
            amount: msg.value,
            status: OrderStatus.PAID,
            renterConfirmed: false,
            ownerConfirmed: false
        });

        emit OrderCreated(orderId, msg.sender, ownerOfCar, msg.value);
    }

    function confirmOrderComplete(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.PAID, "Order is not active");

        if (msg.sender == order.renter) {
            order.renterConfirmed = true;
        } else if (msg.sender == order.ownerOfCar) {
            order.ownerConfirmed = true;
        } else {
            revert("Only renter or owner can confirm");
        }

        emit OrderConfirmed(orderId, msg.sender);

        if (order.renterConfirmed && order.ownerConfirmed) {
            _completeOrder(orderId);
        }
    }

    function _completeOrder(uint256 orderId) internal {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.PAID, "Order is not in a payable state");

        order.status = OrderStatus.COMPLETED;

        payable(order.ownerOfCar).transfer(order.amount);

        emit OrderCompleted(orderId);
    }

    function cancelOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(order.status == OrderStatus.PAID, "Order not paid or already completed");
        require(msg.sender == platformOwner, "Only platform owner can cancel");

        order.status = OrderStatus.CANCELLED;
        payable(order.renter).transfer(order.amount);
    }
}
