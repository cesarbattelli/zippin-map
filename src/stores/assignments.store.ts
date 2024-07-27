import { create, StateCreator } from "zustand";
import { IAssignment, IDelivery, IDriver } from "../interfaces/common";
import { persist } from "zustand/middleware";

export interface AssignmentsState {
  assignments: IAssignment[];
  setAssignment: (delivery: IDelivery, driver: IDriver) => void;
  isAssigned: (deliveryId: number) => IAssignment | undefined;
  getDriverAssignments: (driverId: number) => IAssignment[];
}

const assignmentsStore: StateCreator<AssignmentsState> = (set) => ({
  assignments: [],
  setAssignment: (delivery, driver) => {
    set((state) => {
      const updatedAssignments = state.assignments.map((assignment) => {
        if (assignment.delivery.id === delivery.id) {
          return {
            ...assignment,
            driver: driver,
            assignedAt: new Date(),
          };
        }
        return assignment;
      });

      const isAlreadyAssigned = state.assignments.some(
        (assignment) => assignment.delivery.id === delivery.id
      );

      if (isAlreadyAssigned) {
        return {
          assignments: updatedAssignments,
        };
      }

      return {
        assignments: [
          ...state.assignments,
          {
            delivery: delivery,
            driver: driver,
            assignedAt: new Date(),
          },
        ],
      };
    });
  },
  isAssigned: (deliveryId) => {
    console.log("🚀 ~ file: assignments.store.ts:50 ~ deliveryId:", deliveryId);
    return useAssignmentStore
      .getState()
      .assignments.find((assignment) => assignment.delivery.id === deliveryId);
  },
  getDriverAssignments: (driverId) => {
    return useAssignmentStore
      .getState()
      .assignments.filter((assignment) => assignment.driver.id === driverId);
  },
});

export const useAssignmentStore = create<AssignmentsState>()(
  persist(assignmentsStore, { name: "assignments-storage" })
);
