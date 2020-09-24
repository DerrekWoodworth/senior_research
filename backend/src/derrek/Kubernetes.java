package derrek;

import io.kubernetes.client.Copy;
import io.kubernetes.client.custom.Quantity;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.AppsV1Api;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.*;
import io.kubernetes.client.util.Config;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

/*
  Kubernetes Java client was autogenerated. So the development workflow is to mirror the yaml declerations through the
  fluent api. It is a terrible terrible hassle to write in clojure. Since clojure is built for the JVM we can have a ploygot
  project and leverage java where it is most effective.
  This class handles all interaction between the Kubernetes cluster and Jace
 */
public class Kubernetes {
  private static CoreV1Api coreV1Api;
  private static AppsV1Api appsV1Api;
  private static Copy copy;

  public static void setApis() throws IOException {
    Configuration.setDefaultApiClient(Config.defaultClient().setDebugging(true));
    coreV1Api = new CoreV1Api();
    appsV1Api = new AppsV1Api();
    copy = new Copy();
  }
  public static V1PersistentVolumeClaim createPVCSpec(String name, String size) {
    return new V1PersistentVolumeClaimBuilder()
      .withNewMetadata()
      .withName(name)
      .endMetadata()
      .withNewSpec()
      .withNewResources()
      .withRequests(Map.of("storage", new Quantity(size)))
      .withLimits(Map.of("storage", new Quantity(size)))
      .endResources()
      .addNewAccessMode("ReadOnlyMany")
      .endSpec()
      .build();
  }

  public static void copyFileToPVC(String filepath, String pvcName, String podname) {
    copy.copyFileToPod("default", podname, "container",
      // From
      Path.of(filepath),
      // To
      Path.of("/downloaded.tar"){
    });
  })

  public static V1Pod initPVCPod(String pvcName, String podname) {
    return new V1PodBuilder()
      .withNewMetadata()
      .withName(podname)
      .endMetadata()
      .withNewSpec()
      .addNewContainer()
      .withName("container")
      .withImage("ubuntu")
      .withCommand(List.of(
        "/bin/bash",
        "-c",
        "\"sleep 60; tar -xvf /downloaded.tar -C /startup; sleep 36000\""
      ))
      .endContainer()
      .endSpec()
      .build();
  }

  public static V1Pod createInitPod(V1Pod pod) throws ApiException {
  return coreV1Api.createNamespacedPod("default", pod, null, null, null);
  }

  /*
    Create a deployment obj for a container from the string pvc
   */
  public static V1Deployment createContainerSpec(String pvc) {
    return new V1DeploymentBuilder()
      .withNewMetadata()
      .withName("test-deployment")
      .endMetadata()
      .withNewSpec()
      .withSelector(
        new V1LabelSelectorBuilder()
        .addToMatchLabels("app", "jace")
        .build()
      )
      .withNewTemplate()
      .withNewMetadata()
      .addToLabels("app", "jace")
      .endMetadata()
      .withNewSpec()
      .withVolumes(List.of(
        new V1VolumeBuilder()
        .withName("startup-volume")
        .withPersistentVolumeClaim(new V1PersistentVolumeClaimVolumeSourceBuilder()
        .withClaimName(pvc)
        .withReadOnly(true).build()).build()))
      .addNewContainer()
      .withName("scenario-to-container")
      .withImage("ubuntu")
      .addNewCommand("/bin/bash")
      .addAllToArgs(List.of(
        "-c",
        "while true; do echo $(date); sleep 10; done"
      ))
      .withVolumeMounts(new V1VolumeMountBuilder()
      .withMountPath("/startup")
      .withName("startup-volume")
      .withReadOnly(true).build())
      .endContainer()
      .endSpec()
      .endTemplate()
      .endSpec()
      .build();
  }

  public static V1PersistentVolumeClaim createPVCInCluster(V1PersistentVolumeClaim claim) throws ApiException {
    return coreV1Api.createNamespacedPersistentVolumeClaim("default", claim, null,null,null);
  }

  public static V1Deployment createContainer(V1Deployment deployment) throws ApiException {
    return appsV1Api.createNamespacedDeployment("default", deployment, null, null, null);
  }
}
