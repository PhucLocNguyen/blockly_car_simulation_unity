import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  limit,
  count,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { doc } from "firebase/firestore";
import { toast } from "react-toastify";
const docRef = collection(db, "Projects");
const addNewProject = async (userID, projectTitle, projectType) => {
  let projectId = "";
  try {
    // Create a random projectId
    do {
      projectId = uuidv4();

      // Check if the projectId already exists
      const q = query(
        collection(db, "Projects"),
        where("projectId", "==", projectId)
      );
      var querySnapshot = await getDocs(q);
    } while (!querySnapshot.empty);

    // Add new project if projectId is unique
    await addDoc(collection(db, "Projects"), {
      projectId: projectId,
      name: projectTitle,
      content: "",
      type: projectType,
      userID: userID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};
const duplicateProject = async (userID, projectDetail) => {
  let projectId = "";
  const { id, ...detailRest } = projectDetail; // Loại bỏ ID gốc
  try {
    // Tạo một projectId ngẫu nhiên
    do {
      projectId = uuidv4();

      // Kiểm tra nếu projectId đã tồn tại
      const q = query(
        collection(db, "Projects"),
        where("projectId", "==", projectId)
      );
      var querySnapshot = await getDocs(q);
    } while (!querySnapshot.empty);

    // Thêm project với projectId duy nhất
    const projectRef = doc(db, "Projects", projectId);
    await setDoc(projectRef, {
      ...detailRest,
      projectId: projectId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userID: userID,
    });
    console.log("Project duplicated successfully!");
  } catch (error) {
    console.error("Error duplicating project:", error);
  }
};
const GetAllProjects = async (userID, limitPage = null) => {
  try {
    let q = query(
      docRef,
      where("userID", "==", userID),
      orderBy("createdAt"),
      limit(2)
    );
    if (limitPage == null)
      q = query(docRef, where("userID", "==", userID), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Projects fetched successfully:");
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
};
const CountAllProjects = async (userID) => {
  try {
    const totalQuery = query(docRef, where("userID", "==", userID));
    const totalSnapshot = await getDocs(totalQuery);
    return totalSnapshot.size;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
};
const GetProjectById = async (projectId) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
      const project = { id: projectSnap.id, ...projectSnap.data() };
      return project;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting project:", error);
  }
};
const updateProject = async ({ id, ...updatedData }) => {
  try {
    console.log(updatedData);
    const projectRef = doc(db, "Projects", id);
    const docSnap = await getDoc(projectRef);
    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }

    await updateDoc(projectRef, {
      name: updatedData.name,
      updatedAt: serverTimestamp(),
    });
    // update chua luu duoc
    toast.success("Project updated successfully!");
  } catch (error) {
    toast.error("Error updating project:", error);
  }
};

const updateProjectXML = async (id, content) => {
  try {
    const projectRef = doc(db, "Projects", id);
    const docSnap = await getDoc(projectRef);
    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }

    await updateDoc(projectRef, {
      content: content,
      updatedAt: serverTimestamp(),
    });
    // update chua luu duoc
  } catch (error) {
    toast.error("Error updating project:", error);
  }
};

const deleteProject = async (projectId) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    const docSnap = await getDoc(projectRef);
    if (!docSnap.exists()) {
      console.error(`Project with ID ${projectId} does not exist!`);
      return;
    }

    await deleteDoc(projectRef);
    console.log(`Project with ID ${projectId} deleted successfully!`);
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error);
  }
};

export {
  addNewProject,
  GetAllProjects,
  deleteProject,
  GetProjectById,
  updateProject,
  CountAllProjects,
  updateProjectXML,
  duplicateProject
};
