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
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { doc } from "firebase/firestore";

const addProject = async (userID, projectName, content) => {
  let projectId = "";
  try {
    // Tạo projectId ngẫu nhiên
    do {
      projectId = uuidv4();

      // Kiểm tra xem projectId có bị trùng hay không
      const q = query(
        collection(db, "Projects"),
        where("projectId", "==", projectId)
      );
      var querySnapshot = await getDocs(q);
    } while (!querySnapshot.empty);

    // Thêm project mới nếu projectId là duy nhất
    await addDoc(collection(db, "Projects", "BlocklyProgram"), {
      projectId: projectId,
      name: projectName,
      content: content,
      userID: userID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

const addNewProject = async (userID,projectTitle,projectType) => {
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
      type:projectType,
      userID: userID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

const GetAllProjects = async (userID) => {
  try {
    const q = query(collection(db, "Projects"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Get Projects successfully!", projects);
    return projects;
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
      console.log("Get project successfully!", project);
      return project;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting project:", error);
  }
};
const updateProject = async (projectId, updatedData) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    const docSnap = await getDoc(projectRef);
    if (!docSnap.exists()) {
      console.error("Document does not exist!");
      return;
    }

    await updateDoc(projectRef, {
      content: updatedData,
      updatedAt: serverTimestamp(),
    });
    console.log("Project updated successfully!");
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projects", projectId));
    console.log("Project deleted successfully!");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

export {
  addProject,
  addNewProject,
  GetAllProjects,
  deleteProject,
  GetProjectById,
  updateProject,
};
