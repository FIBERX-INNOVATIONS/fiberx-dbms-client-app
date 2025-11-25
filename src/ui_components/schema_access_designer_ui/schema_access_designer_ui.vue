<template>
    <div :class="props.section_wrapper_class_style">
        <SchemaAccessSectionUI 
            :content_data="props.content_data" 
            :schema_access_definition="props.schema_access_definition" 
            :app_public_id="props.app_public_id"
        />
    </div>
</template>


<script setup lang="ts">
import SchemaAccessDesignerUIProps from "./schema_access_designer_ui_props";
import SchemaDesignerUIController  from "./schema_access_designer_ui_controller";

const props            = defineProps(SchemaAccessDesignerUIProps);
const controller       = new SchemaDesignerUIController(props);

const { components }                = controller.getComponentDefinition();
const { SchemaAccessSectionUI }     = components;
</script>