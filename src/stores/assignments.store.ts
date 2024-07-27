import { create, StateCreator } from "zustand";
import { IAssignment, IDelivery, IDriver } from "../interfaces/common";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface AssignmentsState {
  assignments: IAssignment[];
  setAssignment: (delivery: IDelivery, driver: IDriver) => void;
  isAssigned: (deliveryId: number) => IAssignment | undefined;
  getDriverAssignments: (driverId: number) => IAssignment[];
  deleteAssignment: (assignmentId: string) => void;
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
        (assignment) => assignment.delivery.id === delivery.id,
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
            id: uuidv4(),
            delivery: delivery,
            driver: driver,
            assignedAt: new Date(),
          },
        ],
      };
    });
  },
  isAssigned: (deliveryId) => {
    return useAssignmentStore
      .getState()
      .assignments.find((assignment) => assignment.delivery.id === deliveryId);
  },
  getDriverAssignments: (driverId) => {
    return useAssignmentStore
      .getState()
      .assignments.filter((assignment) => assignment.driver.id === driverId);
  },
  deleteAssignment: (assignmentId) => {
    set((state) => ({
      assignments: state.assignments.filter(
        (assignment) => assignment.id !== assignmentId,
      ),
    }));
  },
});

export const useAssignmentStore = create<AssignmentsState>()(
  persist(assignmentsStore, { name: "assignments-storage" }),
);
