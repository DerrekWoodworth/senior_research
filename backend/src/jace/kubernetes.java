package jace;

import io.kubernetes.client.custom.Quantity;
import io.kubernetes.client.openapi.models.*;

import java.util.List;
import java.util.Map;

public class kubernetes {
  public static V1PersistentVolumeClaim createPVCSpec(String size) {
    return new V1PersistentVolumeClaimBuilder()
      .withNewMetadata()
      .withName("scenario-1")
      .endMetadata()
      .withNewSpec()
      .withNewResources()
      .withLimits(Map.of("storage", new Quantity(size)))
      .endResources()
      .endSpec()
      .build();
  }

  /*
    Create a deployment obj for a container from the string pvc
   */
  public static V1Deployment createContainer(String pvc) {
    return new V1DeploymentBuilder()
      .withNewSpec()
      .withNewTemplate()
      .withNewSpec()
      .withVolumes(List.of(
        new V1VolumeBuilder()
        .withName("startup-volume")
        .withPersistentVolumeClaim(new V1PersistentVolumeClaimVolumeSourceBuilder()
        .withClaimName(pvc)
        .withReadOnly(true).build()).build()))
      .addNewContainer()
      .withName("Scenario to Container")
      .withImage("ubuntu")
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
}
